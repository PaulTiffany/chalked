/* Back to the Drawing Board — lyric-directed chalk illustration score.
   Standalone overlay for the native Chalked R0 score: calls nativeScore() when
   available, so dependencies and cascading erasure are still performed by R0.
   All movements are deterministic functions of the Suno V2 audio clock. */
(() => {
'use strict';
const c=document.getElementById('fx')||document.getElementById('stage');
const g=c.getContext('2d');
const WIDTH=1280,HEIGHT=720,END=249.8;
const C={slate:'#26353a',dark:'#192a30',light:'#fcf2d8',cream:'#f4dfad',wood:'#a36c42',cyan:'#69dcea',pink:'#fa9ab6',peach:'#fcb783',gold:'#ffd478',violet:'#c7a8fa',green:'#8ee5ba',mint:'#a8ebcf',red:'#f67c83',ink:'#111f28'};
const P=[C.cyan,C.pink,C.gold,C.green,C.violet,C.peach];
const TAU=2*Math.PI;
const q=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=x=>{x=q(x);return x*x*(3-2*x)};
const v=(a,b,p)=>a+(b-a)*p;
const wob=(t,n=1,a=4)=>Math.sin(t*n)*a;
const beat=t=>Math.sin(t*TAU*122/60);
const rng=(n)=>{let x=Math.sin(n*128.479+75.61)*43758.5453;return x-Math.floor(x)};
function st(color=C.light,w=4,a=1){g.strokeStyle=color;g.lineWidth=w;g.globalAlpha=a;g.lineCap='round';g.lineJoin='round';g.shadowColor=color;g.shadowBlur=1.8}
function trace(points,color=C.light,w=4,a=1,frac=1){if(points.length<2)return;g.save();st(color,w,a);g.beginPath();g.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++){if(i/(points.length-1)>frac)break;g.lineTo(points[i][0],points[i][1])}g.stroke();g.globalAlpha*=.24;g.lineWidth=Math.max(.7,w*.25);g.translate(1.4,-1.1);g.stroke();g.restore()}
function path(color=C.light,w=4,a=1){g.beginPath();st(color,w,a);return g}
function line(x,y,X,Y,color=C.light,w=4,a=1){trace([[x,y],[X,Y]],color,w,a)}
function poly(points,color=C.light,w=4,a=1){trace(points,color,w,a)}
function rect(x,y,w,h,color=C.light,lw=4,a=1){poly([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]],color,lw,a)}
function fillRect(x,y,w,h,col,a=.15){g.save();g.globalAlpha=a;g.fillStyle=col;g.fillRect(x,y,w,h);g.restore()}
function ell(x,y,rx,ry,col=C.light,w=4,a=1,rotation=0){const pts=[];for(let i=0;i<=72;i++){let ang=i/72*TAU;let px=Math.cos(ang)*rx,py=Math.sin(ang)*ry;pts.push([x+Math.cos(rotation)*px-Math.sin(rotation)*py,y+Math.sin(rotation)*px+Math.cos(rotation)*py])}trace(pts,col,w,a)}
function curve(points,col=C.light,w=4,a=1){if(points.length<4)return poly(points,col,w,a);let out=[];for(let i=0;i<=28;i++){const t=i/28,b=1-t;let x=b*b*b*points[0][0]+3*b*b*t*points[1][0]+3*b*t*t*points[2][0]+t*t*t*points[3][0];let y=b*b*b*points[0][1]+3*b*b*t*points[1][1]+3*b*t*t*points[2][1]+t*t*t*points[3][1];out.push([x,y])}poly(out,col,w,a)}
function dot(x,y,r,col=C.light,a=1){g.save();g.fillStyle=col;g.globalAlpha=a;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.restore()}
function text(s,x,y,size=35,col=C.light,align='center',opacity=1){g.save();g.globalAlpha=opacity;g.textAlign=align;g.textBaseline='middle';g.font=`800 ${size}px "Trebuchet MS", Verdana, sans-serif`;g.lineWidth=1.5;g.strokeStyle=col;g.shadowColor=col;g.shadowBlur=3;g.strokeText(s,x,y);g.fillStyle=col;g.globalAlpha*=.77;g.fillText(s,x,y);g.restore()}
function label(s,x,y,col=C.light,size=23){g.save();g.font=`bold ${size}px Trebuchet MS,Arial`;const w=g.measureText(s).width+36;fillRect(x-w/2,y-19,w,38,C.dark,.92);rect(x-w/2,y-19,w,38,col,2,.8);text(s,x,y,size,col);g.restore()}
function star(x,y,r,col=C.gold){for(let j=0;j<8;j++){const a=j*TAU/8;line(x,y,x+Math.cos(a)*r*(j%2?.64:1),y+Math.sin(a)*r*(j%2?.64:1),col,2)}}
function sparkles(t,count=40){for(let j=0;j<count;j++){let x=(39+j*97.49)%1200+30,y=(j*211.67)%570+95;const a=.12+.16*Math.abs(Math.sin(t*.54+j));dot(x,y,.75+(j%3)*.3,P[j%P.length],a)}}
function board(t,title=''){g.save();g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,WIDTH,HEIGHT);g.fillStyle=C.dark;g.fillRect(0,0,WIDTH,HEIGHT);
 let rad=g.createRadialGradient(640,350,80,640,350,890);rad.addColorStop(0,'#34474b');rad.addColorStop(1,'#1e2b32');g.fillStyle=rad;g.fillRect(0,0,WIDTH,HEIGHT);sparkles(t,95);
 // Chalked's warm wooden rim and chalk tray, a recurring physical setting.
 fillRect(15,10,1250,696,C.wood,.20);rect(21,13,1238,691,C.wood,14,.94);rect(42,35,1196,624,C.cream,2,.30);line(45,670,1235,670,C.wood,11,.93);line(90,678,1195,678,C.cream,2,.33);
 text('CHALKED',101,66,20,C.cream,'left',.72);text('✳',1178,65,21,C.mint,'right',.65);
 if(title)text(title,640,86,24,C.cream,'center',.82);g.restore()}
function chalkDashes(pts,color=C.cream,n=32){for(let j=0;j<n;j++){let a=j/(n-1)*(pts.length-1),i=Math.floor(a),f=a-i;const A=pts[i],B=pts[Math.min(i+1,pts.length-1)];let x=v(A[0],B[0],f),y=v(A[1],B[1],f);dot(x+rng(j)*5-2.5,y+rng(j+18)*5-2.5,1+rng(j+3)*1.8,color,.4)}}
function paper(x,y,w,h,c=C.cream,rot=0){g.save();g.translate(x,y);g.rotate(rot);fillRect(-w/2,-h/2,w,h,c,.14);rect(-w/2,-h/2,w,h,c,4);for(let j=0;j<5;j++)line(-w*.35,-h*.25+j*h*.13,w*.33,-h*.25+j*h*.13,c,1.6,.5);g.restore()}
function head(x,y,r=70,col=C.cyan,emotion='thought',flip=1,t=0){g.save();g.translate(x,y);g.scale(flip,1);g.translate(0,wob(t,.9,2));
 // expressive chalk portrait, shoulders/neck/ears/hair, not a stick figure.
 curve([[-r*.95,r*1.5],[-r*.8,r*.84],[r*.75,r*.84],[r*.95,r*1.5]],col,7);curve([[-r*.2,r*.75],[-r*.2,r],[r*.24,r],[r*.24,r*.74]],col,4);
 ell(0,0,r*.68,r*.92,col,5);ell(-r*.68,r*.1,r*.09,r*.19,col,3);ell(r*.68,r*.1,r*.09,r*.19,col,3);
 curve([[-r*.6,-r*.4],[-r*.6,-r*1.25],[r*.7,-r*1.22],[r*.58,-r*.43]],col,7);
 line(-r*.38,-r*.19,-r*.12,-r*.14,col,3);line(r*.14,-r*.14,r*.39,-r*.19,col,3);dot(-r*.25,-r*.08,3.2,C.light);dot(r*.24,-r*.08,3.2,C.light);
 poly([[-r*.02,-r*.08],[-r*.11,r*.26],[r*.02,r*.3]],col,2);
 if(emotion==='smile')curve([[-r*.31,r*.42],[-r*.1,r*.65],[r*.2,r*.62],[r*.32,r*.41]],C.light,3);
 else if(emotion==='question'){curve([[-r*.3,r*.47],[-r*.1,r*.35],[r*.2,r*.41],[r*.30,r*.38]],C.light,3);text('?',r*.84,-r*.9,30,C.gold)}
 else line(-r*.3,r*.48,r*.30,r*.48,C.light,3);
 g.restore()}
function speech(x,y,w,h,s,col=C.cream){g.save();fillRect(x-w/2,y-h/2,w,h,C.dark,.7);rect(x-w/2,y-h/2,w,h,col,3);poly([[x-w*.2,y+h/2],[x-w*.13,y+h/2+17],[x-w*.05,y+h/2]],col,2);text(s,x,y,Math.min(28,w*.13),col);g.restore()}
function watch(x,y,r,t,fast=false){ell(x,y,r,r,C.gold,6);ell(x,y,r*.9,r*.9,C.cream,1,.6);for(let i=0;i<12;i++){let a=i*TAU/12;line(x+Math.sin(a)*r*.83,y-Math.cos(a)*r*.83,x+Math.sin(a)*r*.95,y-Math.cos(a)*r*.95,C.gold,3)}let a=t*(fast?5.5:.42);line(x,y,x+Math.sin(a)*r*.74,y-Math.cos(a)*r*.74,C.pink,6);line(x,y,x+Math.sin(a*.23)*r*.5,y-Math.cos(a*.23)*r*.5,C.cyan,5);dot(x,y,5,C.light)}
function gearbox(x,y,r,t,col=C.gold,teeth=12){ell(x,y,r*.76,r*.76,col,5);ell(x,y,r*.26,r*.26,C.light,3);for(let j=0;j<teeth;j++){let a=j*TAU/teeth+t;line(x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.8,x+Math.cos(a)*r*1.07,y+Math.sin(a)*r*1.07,col,8)}}
function car(x,y,z,t){g.save();g.translate(x,y);g.scale(z,z);g.translate(0,wob(t,13,2));
 poly([[-137,18],[-123,-20],[-79,-20],[-50,-62],[31,-62],[70,-24],[123,-17],[134,18],[134,41],[-137,41],[-137,18]],C.cyan,7);
 poly([[-62,-55],[-39,-29],[43,-29],[23,-55],[-62,-55]],C.light,3);line(-136,19,130,19,C.gold,4);ell(-83,41,29,29,C.cream,6);ell(83,41,29,29,C.cream,6);ell(-83,41,12,12,C.pink,3);ell(83,41,12,12,C.pink,3);
 for(let i=0;i<5;i++)line(-170-i*26,-13+i*8,-148-i*26,-13+i*8,C.gold,2,.6);star(127,-10,15,C.gold);g.restore()}
function checkered(x,y,t){g.save();g.translate(x,y);let flutter=wob(t,4,14);poly([[0,240],[0,-145],[140+flutter,-140],[140-flutter,70],[0,45]],C.light,5);for(let j=0;j<4;j++)for(let i=0;i<4;i++)if((i+j)%2===0)fillRect(i*35,-135+j*47,35,47,C.light,.39);g.restore()}
function table(x,y,t){ell(x,y+95,240,58,C.gold,7);line(x-180,y+113,x-188,y+202,C.gold,6);line(x+180,y+113,x+188,y+202,C.gold,6);
 for(let j=0;j<5;j++){let xx=x+(j-2)*98,yy=y+55-(j%2)*18;head(xx,yy-120,35,P[j],j%2?'smile':'thought',1,t+j*.6);}
 paper(x,y+75,120,42,C.cream,.12);paper(x+70,y+88,76,36,C.mint,-.2)}
function mapRoad(points,col=C.cyan,frac=1){let n=Math.max(1,Math.round((points.length-1)*q(frac)));trace(points.slice(0,n+1),col,14,1);trace(points.slice(0,n+1),C.cream,2,.7);for(let j=0;j<points.length;j++)if(j<=n)ell(points[j][0],points[j][1],6,6,col,2)}
function route(x,y,ang,len,col,t){g.save();g.translate(x,y);g.rotate(ang);curve([[0,0],[len*.35,-70+Math.sin(t)*12],[len*.65,80+Math.cos(t)*10],[len,0]],col,8);poly([[len-18,-16],[len,0],[len-18,16]],col,6);g.restore()}
function pen(x,y,rot=0,col=C.gold){g.save();g.translate(x,y);g.rotate(rot);poly([[-24,-120],[24,-120],[24,65],[0,110],[-24,65],[-24,-120]],col,6);poly([[-24,60],[0,110],[24,60]],C.light,3);dot(0,83,5,C.light);line(-18,-84,18,-84,C.cream,3);g.restore()}
function loupe(x,y,t){ell(x,y,94,94,C.gold,9);line(x+68,y+66,x+143,y+146,C.gold,17);ell(x-30,y-22,18,20,C.cyan,4);ell(x+23,y+15,12,12,C.pink,3);star(x+10,y-41,22,C.light)}
function eraser(x,y,r=0){g.save();g.translate(x,y);g.rotate(r);g.fillStyle=C.cream;g.globalAlpha=.85;g.fillRect(-75,-27,150,53);g.fillStyle=C.wood;g.fillRect(-75,-27,150,17);rect(-75,-27,150,53,C.light,2);for(let i=0;i<6;i++)dot(-57+i*20,23,3,C.cream,.4);g.restore()}
function hand(x,y,z=1,rot=0,col=C.cyan){g.save();g.translate(x,y);g.rotate(rot);g.scale(z,z);
 // Solid chalk-outline hand with fingers, palm, sleeve.
 poly([[-90,80],[-76,29],[-31,-10],[-19,-80],[-4,-92],[7,-85],[10,-33],[22,-100],[38,-105],[48,-95],[41,-28],[56,-82],[69,-78],[74,-67],[57,5],[78,-37],[92,-30],[96,-18],[63,75],[44,119],[-35,126],[-90,80]],col,7);
 poly([[-42,113],[-38,159],[66,159],[52,112]],C.cream,5);g.restore()}
function easel(x,y,t){line(x-350,y+240,x-130,y-200,C.wood,13);line(x+320,y+240,x+130,y-200,C.wood,13);line(x,y+240,x,y-180,C.wood,9);rect(x-360,y-220,720,415,C.cream,11);fillRect(x-340,y-199,680,370,C.dark,.84);
 // A rapidly evolving landscape on the literal board.
 let p=ease((t%13)/7);curve([[x-292,y+87],[x-140,y-112],[x-60,y+85],[x+25,y-85]],C.cyan,6,.9);curve([[x-35,y+90],[x+88,y-14],[x+137,y+35],[x+280,y-63]],C.green,7,.9);
 ell(x+204,y-110,40,40,C.gold,5);for(let j=0;j<6;j++)star(x-265+j*90,y+127,6,P[j]);}
function mandala(x,y,r,t){g.save();g.translate(x,y);g.rotate(t*.22);for(let ring=0;ring<4;ring++){
 let n=ring===0?8:ring===1?12:ring===2?16:24,rr=r*(.25+.23*ring);
 ell(0,0,rr,rr,P[ring],3,.83);
 for(let j=0;j<n;j++){let a=j*TAU/n;g.save();g.rotate(a);ell(rr+22,0,27+ring*3,12+ring*3,P[(j+ring)%P.length],2,.86);g.restore();}
 }
 ell(0,0,r*.1,r*.1,C.cream,4);g.restore()}
function compass(x,y,r,t,dir=1,col=C.cyan){ell(x,y,r,r,C.gold,6);ell(x,y,r*.77,r*.77,C.cream,2,.8);for(let j=0;j<32;j++){let a=j*TAU/32;line(x+Math.cos(a)*r*.87,y+Math.sin(a)*r*.87,x+Math.cos(a)*(j%8===0?r*.99:r*.92),y+Math.sin(a)*(j%8===0?r*.99:r*.92),C.cream,2,.8)}
 const a=dir*.3*Math.sin(t*.18)+dir*(t*.035)+1;poly([[x-Math.sin(a)*15,y-Math.cos(a)*16],[x+Math.sin(a)*r*.76,y-Math.cos(a)*r*.76],[x+Math.sin(a)*15,y+Math.cos(a)*16]],col,5);poly([[x+Math.sin(a)*15,y+Math.cos(a)*16],[x-Math.sin(a)*r*.76,y+Math.cos(a)*r*.76],[x-Math.sin(a)*15,y-Math.cos(a)*16]],C.pink,5);dot(x,y,7,C.cream)}
function book(x,y,t){g.save();g.translate(x,y);let spread=19+6*Math.sin(t*.4);poly([[-245,105],[-232,-118],[-30,-98],[0,-67],[30,-98],[232,-118],[245,105],[26,101],[0,120],[-26,101],[-245,105]],C.cream,8);curve([[-218,-95],[-131,-75],[-50,-93],[0,-63]],C.cyan,4);curve([[0,-63],[50,-92],[131,-75],[218,-95]],C.green,4);line(0,-63,0,119,C.gold,3);
 for(let j=0;j<5;j++){let y=-54+j*33;line(-208,y,-42,y+Math.sin(j)*7,C.cream,2,.8);line(42,y+Math.cos(j)*9,211,y,C.cream,2,.8)}g.restore()}
function sign(x,y,t){line(x,y-180,x,y+240,C.gold,13);poly([[x-230,y-146],[x+187,y-146],[x+229,y-102],[x+187,y-60],[x-230,y-60],[x-230,y-146]],C.gold,7);
 text('EVERYONE CAN READ',x-11,y-103,26,C.cream);
 poly([[x-190,y+7],[x+225,y+7],[x+225,y+95],[x-151,y+95],[x-190,y+52],[x-190,y+7]],C.violet,7);
 text('FOR WHOM?',x+15,y+54,29,C.cream);star(x-280,y-100,17,C.cyan);}
function door(x,y,t){let swing=ease((t-109)/3);rect(x-115,y-183,230,365,C.gold,10);poly([[x-103,y-175],[x+110-swing*180,y-165+swing*12],[x+110-swing*180,y+171-swing*12],[x-103,y+174],[x-103,y-175]],C.green,7);ell(x+67-swing*159,y+14,5,5,C.cream,3);
 for(let j=0;j<6;j++)star(x-4+(j-3)*41,y-215-rng(j)*45,8,P[j]);}
function skyline(x,y,s=1,t=0,col=C.cyan){g.save();g.translate(x,y);g.scale(s,s);const heights=[160,229,142,330,196,277,158,190,258,145];let xx=-520;
 for(let j=0;j<heights.length;j++){const w=82+(j%3)*20,h=heights[j];rect(xx,-h,w,h,col,3,.92);if(j%3===0)poly([[xx-8,-h],[xx+w/2,-h-32],[xx+w+8,-h]],C.gold,4);else if(j%3===1)ell(xx+w/2,-h-11,16,16,C.pink,2);
 for(let yy=-h+32;yy<-25;yy+=39)for(let k=0;k<2;k++)fillRect(xx+20+k*35,yy,15,16,C.cream,.35+.2*Math.sin(t+j+k));xx+=w+17;}
 line(-555,8,568,8,C.cream,5);g.restore()}
function sun(x,y,r,t){ell(x,y,r,r,C.gold,5);for(let j=0;j<12;j++){let a=j*TAU/12+t*.05;line(x+Math.cos(a)*(r+12),y+Math.sin(a)*(r+12),x+Math.cos(a)*(r+38),y+Math.sin(a)*(r+38),C.gold,3)} }
function lighthouse(x,y,t){poly([[x-46,y+135],[x-30,y-136],[x+30,y-136],[x+46,y+135],[x-46,y+135]],C.cream,7);poly([[x-56,y-136],[x+55,y-136],[x+28,y-181],[x-28,y-181],[x-56,y-136]],C.gold,6);ell(x,y-151,12,13,C.gold,4);for(let j=0;j<3;j++){ell(x,y-145,90+j*64,32+j*22,C.gold,2,.5)}line(x-109,y+144,x+108,y+144,C.cyan,6)}
function helm(x,y,r,t){ell(x,y,r*.72,r*.72,C.gold,8);ell(x,y,r*.24,r*.24,C.cream,4);for(let j=0;j<8;j++){let a=j*TAU/8+t*.21;line(x+Math.cos(a)*r*.22,y+Math.sin(a)*r*.22,x+Math.cos(a)*r*1.13,y+Math.sin(a)*r*1.13,C.gold,9);ell(x+Math.cos(a)*r*1.08,y+Math.sin(a)*r*1.08,7,7,C.cream,3)}}
function ship(x,y,t){g.save();g.translate(x,y+wob(t,2,5));poly([[-270,40],[285,40],[212,171],[-187,171],[-270,40]],C.cyan,9);poly([[-185,40],[-152,-100],[32,-100],[80,40]],C.cream,6);poly([[-38,-103],[-38,-201],[135,-111],[-38,-103]],C.gold,5);line(-38,-103,-38,40,C.cream,6);for(let i=0;i<5;i++)curve([[-320+i*155,194],[-275+i*155,165],[-232+i*155,211],[-180+i*155,187]],C.green,4);g.restore()}
function robot(x,y,z=1,t=0,col=C.pink){g.save();g.translate(x,y+wob(t+z,4,4));g.scale(z,z);
 // cute character with filled screen, glowing eyes, articulated arms
 fillRect(-63,-56,126,118,col,.13);rect(-65,-55,130,111,col,6);ell(-27,-8,15,17,C.cream,5);ell(26,-8,15,17,C.cream,5);ell(-25,-5,6,8,col,3);ell(27,-5,6,8,col,3);curve([[-27,30],[-6,44],[16,44],[32,30]],C.cream,3);
 line(0,-55,0,-89,col,5);ell(0,-93,9,9,C.gold,3);poly([[-45,58],[-51,102],[52,102],[44,58]],col,6);line(-53,71,-92,110,col,5);line(53,70,92,110,col,5);ell(-100,115,14,12,col,3);ell(101,115,14,12,col,3);g.restore()}
function envelope(x,y,w=130,h=88,col=C.gold,open=false){g.save();g.translate(x,y);fillRect(-w/2,-h/2,w,h,col,.16);rect(-w/2,-h/2,w,h,col,5);poly([[-w/2,-h/2],[0,h*.04],[w/2,-h/2]],col,3);if(open)poly([[-w/2,-h/2],[0,-h*.85],[w/2,-h/2]],C.pink,4);g.restore()}
function cabinet(x,y,t){rect(x-166,y-188,332,407,C.gold,7);for(let j=0;j<3;j++){let yy=y-165+j*116;let out=j===1?ease((t-148)/3)*42:0;
 fillRect(x-141+out,yy,280,100,C.cream,.09);rect(x-141+out,yy,280,100,j===1?C.green:C.cream,4);rect(x-44+out,yy+12,88,20,C.gold,2);line(x-35+out,yy+59,x+38+out,yy+59,C.light,6);}
 paper(x+48+45*ease((t-149)/3),y-40,119,77,C.mint,-.18)}
function office(t){robot(270,385,1.05,t,C.cyan);robot(1004,385,1.05,t+3,C.violet);envelope(641,328,175,118,C.gold,t>149);if(t>149){label('OPEN?',648,435,C.red,28);for(let i=0;i<4;i++){let x=406+i*150,y=553+Math.sin(t+i)*11;robot(x,y,.39,t+i,P[i+1]);if(i)line(x-93,y-43,x-67,y-43,C.pink,4)}}}
function ribbon(x,y,w,h,col=C.cyan,offset=0){const pts=[];for(let j=0;j<=45;j++){let xx=x+j/45*w,yy=y+Math.sin(j/45*TAU*1.4+offset)*h;pts.push([xx,yy])}trace(pts,col,8)}
function handoffGraph(t){let n=Math.min(14,Math.max(0,Math.floor((t-151.4)*2.1)));for(let i=0;i<n;i++){let x=160+i*76,y=380+Math.sin(i*1.6)*105,col=i%3===0?C.red:P[i%P.length];if(i){let px=160+(i-1)*76,py=380+Math.sin((i-1)*1.6)*105;line(px,py,x,y,col,5)}ell(x,y,19,19,col,5);if(i===0)text('?',x,y-1,25,C.red)}
 if(t>157){let drop=ease((t-158)/1.9);eraser(970-360*drop,301,-.28);for(let i=0;i<14;i++)if(drop>i/14)star(258+i*60,490-40*Math.sin(i),8,P[i%6]);text('CHECK THE ORIGINAL RECORD',640,583,39,C.mint)}}
function factory(t){for(let k=0;k<3;k++){let y=190+k*140;poly([[130,y],[1150,y]],k%2?C.gold:C.cyan,9);for(let i=0;i<11;i++){let x=150+((i*123+(t-162)*95*(k+1))%1000);rect(x,y-35,74,67,P[(i+k)%P.length],3,.9);line(x+15,y+1,x+56,y+1,C.light,2,.7)}
 gearbox(195+k*430,y+73,45,(t-162)*(k%2?-2:2),P[k])}}
function rights(t){const titles=['READ','WRITE','ERASE'];for(let j=0;j<3;j++){let x=260+j*380;let col=P[j];ell(x,306,100,100,col,6);if(j===0){book(x,302,t);/* icon below atop small version impossible, so overlays */}
 if(j===1){pen(x,307,-.2,col);}
 if(j===2){eraser(x,311,.2);}
 label(titles[j],x,491,col,37);}}
function checklist(t){const items=[['NOTICE',C.cyan],['QUESTION',C.gold],['REVISE',C.green]];for(let i=0;i<3;i++){let x=314+i*326;rect(x-108,247,216,228,items[i][1],4);ell(x,328,57,57,items[i][1],5);
 if(i===0)loupe(x,320,t);if(i===1){text('?',x,324,92,items[i][1]);}if(i===2){poly([[x-53,330],[x-5,372],[x+71,287]],items[i][1],12);}
 text(items[i][0],x,437,31,items[i][1]);}}
function tree(x,y,s=1,t=0,col=C.green){g.save();g.translate(x,y);g.scale(s,s);poly([[0,130],[-8,-20],[-65,-79]],C.wood,10);poly([[0,-23],[61,-106]],C.wood,9);poly([[0,55],[85,-23]],C.wood,7);for(let j=0;j<9;j++){let a=j*TAU/9+t*.06;ell(Math.cos(a)*74, -77+Math.sin(a)*65,48,35,j%2?col:C.mint,4,.8)}g.restore()}
function house(x,y,s=1,col=C.gold){g.save();g.translate(x,y);g.scale(s,s);rect(-115,-65,230,176,col,6);poly([[-135,-65],[0,-188],[135,-65]],col,7);rect(-26,26,52,84,C.cream,4);ell(12,64,4,4,C.cream,2);rect(-85,-27,48,52,C.cyan,3);rect(41,-27,48,52,C.cyan,3);g.restore()}
function bridge(x,y,s=1,col=C.cyan){g.save();g.translate(x,y);g.scale(s,s);curve([[-235,24],[-90,-158],[92,-158],[235,24]],col,10);line(-235,24,-235,94,col,7);line(235,24,235,94,col,7);line(-239,15,239,15,C.cream,7);for(let i=-3;i<=3;i++)line(i*55,0,i*55,82,C.gold,3);g.restore()}
function fountain(x,y,s=1,t=0,col=C.violet){g.save();g.translate(x,y);g.scale(s,s);ell(0,65,100,30,col,6);line(-90,60,-68,103,col,5);line(90,60,68,103,col,5);ell(0,8,44,18,C.cyan,4);line(0,9,0,-120,C.cyan,8);for(let i=-2;i<=2;i++){let a=i*.36;curve([[0,-110],[Math.sin(a)*40,-172],[Math.sin(a)*130,-100],[i*48,0]],C.cyan,3)}g.restore()}
function sproutLogo(x,y,s=1,t=0){g.save();g.translate(x,y);g.scale(s,s);ell(0,-15,94,100,C.cream,7);curve([[0,83],[0,14],[-86,-23],[-44,-44]],C.green,7);curve([[0,23],[24,-69],[75,-82],[65,-28]],C.green,7);curve([[-44,-44],[-5,-95],[6,-73],[0,23]],C.green,6);line(-57,97,61,97,C.cream,5);g.restore()}
function musicNotes(t){for(let i=0;i<17;i++){let x=100+((i*79+t*16)%1060),y=140+Math.sin(i*1.2+t*.8)*72,sz=9+(i%5)*3;dot(x,y,sz*.35,P[i%P.length],.8);line(x+sz*.3,y,x+sz*.3,y-sz*2,P[i%P.length],3);line(x+sz*.3,y-sz*2,x+sz*1.2,y-sz*1.8,P[i%P.length],3)}}
function banner(t,s){g.save();fillRect(130,543,1020,93,C.dark,.8);let sz=s.length>35?36:s.length>24?43:55;text(s,640,591,sz,C.light,'center',.93);g.restore()}
const CUES=[
 [0,12,'THE AGREEMENT'],[12,28.97,'SAME WORD · DIFFERENT WORLDS'],
 [28.97,36.55,'THE RACE'],[36.55,43.17,'WHO IS AFFECTED?'],[43.17,50.83,'TWO ROUTES'],[50.83,60.06,'BEFORE THE INK DRIES'],
 [60.06,83.79,'THE DRAWING BOARD'],[83.79,91.73,'A DIFFERENT RETURN'],
 [91.73,99.30,'TWO COMPASSES'],[99.30,105.95,'KEEP A QUESTION OPEN'],[105.95,113.79,'SIGNPOSTS · ADDRESSIVITY'],[113.79,122.86,'THE NEXT DAY'],
 [122.86,146.37,'THE SECOND DRAWING'],[146.37,153.63,'THE SENT-MAIL MISTAKE'],[153.63,161.71,'A CHAIN OF ASSUMPTIONS'],
 [161.71,168.95,'THE PLAN FACTORY'],[168.95,180.33,'NO WAY TO STEER'],[180.33,188.66,'WHO HOLDS THE ERASER?'],[188.66,202.60,'REOPEN THE CHOICE'],
 [202.60,225.52,'A SHARED DRAWING'],[225.52,236.17,'TWO VOICES'],[236.17,END+.01,'A NEW PLAN']];
const LINES=`5.06|You said yes
8.88|I said yes
12.10|Same word, different worlds
28.97|I was racing for the finish
32.72|You were asking who's affected
36.55|We both understood the mission
39.42|But we weighed it different ways
43.17|When you told me what you'd heard
45.11|I could see the road you'd taken
47.02|Not a failure of the language
48.99|Just a choice we hadn't made
50.83|A clearer note can show the crack
52.68|Can't tell us what to prize
54.56|So tell me while the line is loose
56.61|Before the ink has dried
60.06|Back to the drawing board!
62.91|Draw another line
64.60|Trust is giving room to move
66.54|And room to change our minds
67.89|Back to the drawing board!
69.83|Call the whole room in
71.80|How soon do we know we're drifting?
75.51|Who can change what happens next?
78.86|Who holds the eraser?
83.79|Round and round, not the same again
87.64|Draw it, draw it, draw it again!
91.73|Your compass isn't my compass
95.42|Still our roads can share a mile
99.30|We can leave a question open
103.12|Let the difference stay awhile
105.95|Everyone can read the signpost
107.92|Not everyone is who it's for
109.71|Who can write and who can wipe it?
111.43|Who gets to reopen the door?
113.79|Tomorrow brings a different world
115.57|The goal can change as well
117.86|A warning isn't power
119.76|If no one gets to steer
122.86|Back to the drawing board!
125.66|Draw another line
127.31|Trust is giving room to move
129.29|And room to change our minds
130.68|Back to the drawing board!
132.59|Call the whole room in
134.55|How soon do we know we're drifting?
138.23|Who can change what happens next?
141.59|Who holds the eraser?
146.37|Two agents checked the sent mail
148.02|Said the choice was open still
149.97|But the answer lived in another record
152.07|And the morning plan went on
153.63|Each new handoff held the first guess
155.72|Every step depended on it
157.51|Till we checked it with the record
159.45|And we saw where it went wrong
161.71|Faster, faster, plans are turning
163.18|Faster than the room can read
165.54|Faster, faster, hands are moving
167.08|Past the chance to disagree
168.95|You can name a human captain
170.86|Of a ship they cannot steer
172.74|If they cannot change the heading
174.63|What does being in charge mean here?
180.33|Who can read it? (Who is it for?)
182.37|Who can write it? (Who holds the board?)
184.21|Who can stop it? (Who holds the eraser?)
187.02|Bring the choice back to the floor
188.66|No promise we can solve tomorrow
190.90|Or keep pace with every mind
192.44|But we can count the time to notice
194.60|And the cost of changing lines
202.60|Back to the drawing board!
205.40|Draw another line
207.07|Trust is giving room to move
208.99|And room to change our minds
210.43|Back to the drawing board!
212.35|Call the whole room in
214.23|How soon do we know we're drifting?
217.98|Who can change what happens next?
221.28|Who holds the eraser?
225.52|You said yes
229.34|I said yes
232.19|Now we know what to ask
236.17|Round and round, not where we began
240.02|We can trust and change the plan`.split('\n').map(z=>{let k=z.indexOf('|');return {t:+z.slice(0,k),s:z.slice(k+1)}});
function lyric(t){let s='';for(const a of LINES){if(a.t<=t)s=a.s;else break;}return s;}
function render(t){t=q(t,0,END);if(typeof nativeScore==='function')nativeScore(t); else if(typeof chalkedRelay==='function')chalkedRelay(t);
 board(t);const k=CUES.findIndex(z=>t>=z[0]&&t<z[1]);const [a,b,name]=CUES[Math.max(0,k)];const d=t-a;const fade=ease(d/.52);g.save();g.globalAlpha=fade;
 // Each sequence uses fully illustrated, lyric-specific props with beat-reactive movement.
 switch(k){
 case 0: // Portraits with two agreements, no stickmen.
 head(350,345,125,C.cyan,'smile',1,t);head(920,345,125,C.pink,'question',-1,t);
 speech(328,173,246,70,'YES',C.cyan);if(t>8.7)speech(943,173,246,70,'YES',C.pink);
 break;
 case 1: // Incompatible worlds: speed versus people, held in parallel.
 watch(339,276,105,t);car(342,468,.88,t);table(889,374,t);line(634,158,634,566,C.cream,3,.45);
 if(t>16){route(522,492,-.35,158,C.cyan,t);route(750,492,3.4,155,C.pink,t)}
 break;
 case 2: car(518+((t-29)*11)%230,405,1.45,t);checkered(1075,263,t);watch(237,265,91,t,true);text('FINISH',901,206,54,C.gold);
 break;
 case 3: table(640,364,t);speech(319,209,225,61,'WHO?',C.pink);speech(985,205,240,61,'AFFECTED?',C.cyan);break;
 case 4: mapRoad([[164,478],[270,360],[425,407],[550,268],[665,343],[790,224],[1113,270]],C.cyan,ease(d/7));mapRoad([[164,478],[292,538],[465,478],[618,508],[753,421],[899,469],[1114,375]],C.pink,ease(d/7));
 for(let i=0;i<6;i++)star(185+i*166,191+45*Math.sin(i+t*.3),13,P[i]);break;
 case 5: paper(512,341,425,310,C.cream,-.09);loupe(818,337,t);pen(300,393,.58,C.gold);
 if(t>54)route(470,471,-.1,290,C.pink,t);break;
 case 6: easel(622,354,t);hand(993,418,.84,-.9,C.cyan);eraser(312+240*ease((d%11)/5),472,-.22);
 if(t>69){ribbon(280,501,690,33,C.green,t*.5)}
 if(t>75){speech(1023,227,255,61,'CHANGE?',C.gold)}
 break;
 case 7: mandala(640,354,201,t);musicNotes(t);break;
 case 8: compass(371,339,164,t,1,C.cyan);compass(885,339,164,t,-1,C.pink);ribbon(441,534,354,53,C.green,t*.18);break;
 case 9: book(640,362,t);star(643,134,36,C.gold);for(let j=0;j<5;j++)star(295+j*184,161+Math.sin(t+j)*28,8,P[j]);break;
 case 10: sign(412,374,t);head(1021,373,86,C.pink,'question',-1,t);if(t>109)door(1030,344,t);break;
 case 11: skyline(636,544,.97,t,C.cyan);sun(955,211,70,t);if(t>117)lighthouse(230,412,t);break;
 case 12: // Evolving shared construction, new plan is visibly different.
 easel(632,367,t);sproutLogo(625,350,1,t);for(let j=0;j<8;j++)star(198+j*128,552+Math.sin(t+j)*24,7,P[j%6]);
 eraser(295+280*ease(((t-123)%12)/6),496,-.15);break;
 case 13: office(t);cabinet(668,375,t);if(t>149.8){label('THE REPLY WAS ELSEWHERE',650,602,C.red,29)}break;
 case 14: handoffGraph(t);cabinet(1021,355,t);break;
 case 15: factory(t);watch(1030,479,95,t,true);break;
 case 16: ship(600,377,t);helm(930,310,93,t);head(440,278,64,C.cyan,'question',-1,t);if(t>174)line(930,393,1029,476,C.red,8);break;
 case 17: // Read / write / erase are materially different privileges.
 {const ys=[244,380,520],labels=['READ','WRITE','ERASE'];for(let j=0;j<3;j++){let y=ys[j];rect(147,y-50,228,101,P[j],4);text(labels[j],263,y,36,P[j]);}
 book(706,240,t);pen(955,374,.36,C.cyan);eraser(1023,520,.16);hand(685,450,.76,-.25,C.cyan);}
 break;
 case 18: checklist(t);mandala(640,199,113,t);break;
 case 19: // Different autonomous contributions become a single richer shared world.
 skyline(641,521,.7,t,C.violet);house(315,470,.75,C.gold);bridge(634,524,.64,C.cyan);tree(990,419,.77,t,C.green);
 sun(1063,202,55,t);fountain(635,469,.45,t,C.pink);
 for(let j=0;j<5;j++){let xx=246+j*195;star(xx,165+14*Math.sin(j+t),15,P[j]);}
 if(t>212){ribbon(150,578,980,19,C.green,t*.4);ribbon(150,593,980,16,C.pink,t*.3+2)}
 break;
 case 20: head(374,344,120,C.cyan,'smile',1,t);head(906,344,120,C.pink,'smile',-1,t);speech(374,171,234,65,'YES',C.cyan);if(t>229)speech(906,171,235,65,'YES',C.pink);ribbon(400,534,485,41,C.green,t*.25);break;
 case 21: // Return to an open board with a genuinely revised future.
 skyline(644,535,.70,t,C.violet);tree(948,383,.72,t,C.green);house(345,449,.65,C.gold);
 sproutLogo(639,311,.9,t);ribbon(169,570,960,30,C.cyan,t*.1);if(t>242)mandala(644,305,127,t);break;
 }
 g.restore();
 // Intentional lyric band: readable but never dominant over the drawings.
 fillRect(62,620,1156,44,C.ink,.91);text(lyric(t),640,644,22,C.light,'center',1);
 text(name,640,106,24,C.gold,'center',.85);
 line(72,685,1204,685,C.cream,3,.2);line(72,685,72+(1204-72)*t/END,685,C.cyan,5,.85);
 return t;}
 window.renderAt=render;
 window.chalkedArtVersion='V3 lyric-directed illustrations';
 render(0);
})();