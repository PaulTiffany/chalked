"""Render the Chalked music video as MP4 with an authorized owner-supplied Suno V2 file."""
import argparse, asyncio, subprocess
from pathlib import Path
from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent

async def render():
    ap = argparse.ArgumentParser()
    ap.add_argument('--audio', type=Path, required=True)
    ap.add_argument('--output', type=Path, default=HERE / 'back_to_the_drawing_board.mp4')
    ap.add_argument('--start', type=float, default=0)
    ap.add_argument('--duration', type=float, default=249.8)
    ap.add_argument('--width', type=int, default=960)
    ap.add_argument('--fps', type=int, default=15)
    a = ap.parse_args()
    if not a.audio.exists(): ap.error('Download your own authorized Suno Version 2 MP3 first and supply --audio PATH.')
    total = max(0, min(a.duration, 249.8 - a.start))
    if total <= 0: ap.error('duration out of range')
    temp = a.output.with_suffix('.video-only.mp4')
    cmd = ['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(a.fps),'-vcodec','mjpeg','-i','-', '-c:v','libx264','-preset','veryfast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(temp)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    async with async_playwright() as pw:
        b = await pw.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'])
        page = await b.new_page(viewport={'width':a.width+30,'height':round(a.width*9/16)+140},device_scale_factor=1)
        await page.set_content((HERE/'index.html').read_text(encoding='utf-8'), wait_until='domcontentloaded')
        await page.evaluate('(w)=>{let c=document.getElementById("fx"); c.width=w;c.height=Math.round(w*9/16)}', a.width)
        wrap = page.locator('.wrap')
        n = round(total*a.fps)
        for i in range(n):
            await page.evaluate('(t)=>window.renderAt(t)', a.start+i/a.fps)
            proc.stdin.write(await wrap.screenshot(type='jpeg',quality=78,animations='disabled',timeout=20000))
            if (i+1)%500==0: print(f'{i+1}/{n} frames', flush=True)
        await b.close()
    proc.stdin.close()
    if proc.wait(): raise RuntimeError('FFmpeg video encoder failed')
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(temp),'-ss',str(a.start),'-t',str(total),'-i',str(a.audio),'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',str(a.output)], check=True)
    temp.unlink()
    print(a.output)

if __name__=='__main__': asyncio.run(render())
