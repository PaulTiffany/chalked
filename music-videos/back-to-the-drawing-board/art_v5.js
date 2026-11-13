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

// V4: one *authored sketched scene* per lead-vocal karaoke line.
// These are chalk assets, drawn stroke by stroke from paths, not slideshow photos.
function arrow(x,y,X,Y,col=C.gold,w=6){line(x,y,X,Y,col,w);let a=Math.atan2(Y-y,X-x);poly([[X-20*Math.cos(a-.58),Y-20*Math.sin(a-.58)],[X,Y],[X-20*Math.cos(a+.58),Y-20*Math.sin(a+.58)]],col,w)}
function cross(x,y,s=33,col=C.pink){line(x-s,y-s,x+s,y+s,col,7);line(x+s,y-s,x-s,y+s,col,7)}
function tick(x,y,s=38,col=C.green){poly([[x-s,y],[x-s*.22,y+s*.53],[x+s,y-s*.85]],col,9)}
function lock(x,y,s=1,col=C.gold,open=false){g.save();g.translate(x,y);g.scale(s,s);rect(-65,-16,130,114,col,6);curve([[-48,-17],[-60,-126],[68,-116],[48,-10]],col,9);if(open)line(60,-38,99,-74,C.red,6);ell(0,31,11,12,col,3);line(0,41,0,68,col,6);g.restore()}
function key(x,y,s=1,col=C.gold,rot=0){g.save();g.translate(x,y);g.scale(s,s);g.rotate(rot);ell(-83,-6,39,39,col,8);line(-42,-6,96,-6,col,10);line(72,-6,72,34,col,7);line(94,-6,94,23,col,7);g.restore()}
function balance(x,y,t,c1=C.cyan,c2=C.pink){line(x,y-155,x,y+175,C.gold,11);line(x-190,y+177,x+190,y+177,C.gold,8);line(x-235,y-142+wob(t,.5,12),x+235,y-142-wob(t,.5,12),C.gold,8);for(let k of [-1,1]){let X=x+k*182,Y=y-142-k*wob(t,.5,12);line(X,Y,X-49,Y+130,C.cream,3);line(X,Y,X+49,Y+130,C.cream,3);poly([[X-81,Y+133],[X+81,Y+133],[X+49,Y+155],[X-49,Y+155],[X-81,Y+133]],k===-1?c1:c2,6)}ell(x,y-142,15,15,C.cream,5)}
function fingerprint(x,y,t,col=C.cyan){for(let j=0;j<11;j++){let r=22+j*13;const pts=[];for(let k=0;k<=48;k++){let a=k/48*TAU*.9+Math.PI*.07;pts.push([x+Math.sin(a)*r*.72,y+Math.cos(a)*r])}trace(pts,col,j%3?2.3:3.6,.86,j/12+.12)}dot(x,y,6,C.gold)}
function flower(x,y,s=1,t=0,col=C.green){g.save();g.translate(x,y);g.scale(s,s);for(let j=0;j<8;j++){let a=j*TAU/8+t*.14;ell(Math.cos(a)*53,Math.sin(a)*53,45,28,col,4,.87,a)}ell(0,0,25,25,C.gold,5);g.restore()}
function badge(x,y,c=C.cyan){ell(x,y,98,110,c,5);poly([[x-77,y+65],[x-121,y+153],[x-38,y+130]],c,5);poly([[x+77,y+65],[x+121,y+153],[x+38,y+130]],c,5);star(x,y,55,C.gold)}
function flag(x,y,c=C.pink,w=178){line(x,y-174,x,y+156,C.cream,8);poly([[x+3,y-174],[x+w,y-156],[x+w-37,y-106],[x+3,y-100]],c,7)}
function microphone(x,y,t,c=C.cyan){ell(x,y-100,40,75,c,7);for(let j=0;j<6;j++)line(x-29,y-143+j*17,x+29,y-143+j*17,c,1.8,.55);curve([[x-68,y-82],[x-75,y+60],[x+77,y+60],[x+69,y-82]],C.gold,7);line(x,y+60,x,y+150,C.gold,7);line(x-56,y+150,x+56,y+150,C.gold,7);for(let j=0;j<4;j++)ell(x,y-110,73+j*36,82+j*30,C.pink,2,.30+Math.sin(t*3+j)*.15)}
function decision(x,y,p,variant=0){const root=[x,y-142],mid=[x,y-12],a=[x-225,y+148],b=[x+225,y+148];ell(root[0],root[1],21,21,C.gold,5);arrow(...root,...mid,C.cream,7);curve([[...mid],[x-26,y+55],[x-165,y+20],[...a]],variant?C.pink:C.cyan,7);curve([[...mid],[x+26,y+55],[x+157,y+29],[...b]],variant?C.green:C.pink,7);ell(...a,31,31,C.cyan,5);ell(...b,31,31,C.pink,5);if(p>.5)star(variant?b[0]:a[0],y+148,20,C.gold)}
function goal(x,y,p){line(x-159,y+163,x-159,y-70,C.cream,9);line(x+159,y+163,x+159,y-70,C.cream,9);line(x-159,y-70,x+159,y-70,C.gold,10);const xx=x-105+230*ease(p);ell(xx,y-89,45,45,C.pink,6);arrow(x-296,y+114,x-120,y+5,C.cyan,8)}
function droplet(x,y,s=1,col=C.cyan){g.save();g.translate(x,y);g.scale(s,s);curve([[0,-124],[-22,-50],[-86,21],[0,99]],col,7);curve([[0,99],[86,21],[22,-50],[0,-124]],col,7);curve([[-30,29],[-32,51],[-17,66],[3,74]],C.cream,4);g.restore()}
function scroll(x,y,s=1,col=C.gold){g.save();g.translate(x,y);g.scale(s,s);rect(-165,-135,330,270,col,5);ell(-165,-132,22,22,col,6);ell(165,133,22,22,col,6);for(let j=0;j<6;j++)line(-120,-90+j*38,120,-90+j*38,col,2,.4);g.restore()}
function hourglass(x,y,t){poly([[x-91,y-169],[x+91,y-169],[x+91,y-143],[x-91,y-143],[x-91,y-169]],C.gold,6);poly([[x-90,y+167],[x+90,y+167],[x+90,y+142],[x-90,y+142],[x-90,y+167]],C.gold,6);poly([[x-76,y-140],[x+76,y-140],[x,y],[x+76,y+140],[x-76,y+140],[x,y],[x-76,y-140]],C.cream,6);let p=(Math.sin(t*.7)+1)*.5;poly([[x-47,y-120],[x+47,y-120],[x,y-120+100*p],[x-47,y-120]],C.pink,3);poly([[x-49,y+121],[x+49,y+121],[x,y+118-92*p],[x-49,y+121]],C.cyan,3);line(x,y-6,x,y+76,C.gold,4)}
function plant(x,y,p,col=C.green){line(x,y+129,x,y+129-242*ease(p),col,7);for(let j=0;j<5;j++){let yy=y+78-j*42,side=j%2?-1:1;curve([[x,yy],[x+side*43,yy-21],[x+side*93,yy-26],[x+side*104,yy-68]],col,5)}ell(x,y-122,30,35,C.gold,4)}
function connectedDots(x,y,t,n=7,p=1,col=C.cyan){const pts=Array.from({length:n},(_,j)=>[x+(j-(n-1)/2)*105,y+Math.sin(j*1.5+t*.55)*71]);for(let j=0;j<Math.min(n-1,Math.floor(p*n));j++)arrow(...pts[j],...pts[j+1],P[j%P.length],4);for(let j=0;j<n;j++){if(j/n<=p+.13){ell(...pts[j],18,18,col,3);star(...pts[j],8,P[j%P.length])}}}
function mailStack(x,y,t,n=4){for(let j=0;j<n;j++){let xx=x+j*99,yy=y+Math.sin(t*1.8+j)*16;envelope(xx,yy,93,70,P[j%P.length]);if(j)arrow(xx-65,yy,xx-45,yy,C.cream,2)}}
function ballot(x,y,p){rect(x-162,y-15,324,210,C.cream,7);rect(x-122,y+23,242,58,C.gold,4);poly([[x-70,y-155],[x+102,y-169],[x+110,y+15],[x-72,y+30],[x-70,y-155]],C.cyan,7);tick(x+8,y+90,24,C.green);if(p>.5)tick(x-12,y-70,35,C.gold)}
function speechRing(x,y,t,n=8){for(let j=0;j<n;j++){let a=j*TAU/n+t*.14;let X=x+Math.cos(a)*210,Y=y+Math.sin(a)*180;ell(X,Y,37,30,P[j%P.length],4);poly([[X-11,Y+28],[X-29,Y+57],[X+13,Y+27]],P[j%P.length],3)}ell(x,y,65,55,C.cream,4);star(x,y,40,C.gold)}
function stamps(x,y,t){for(let i=0;i<6;i++){let X=x+(i-2.5)*167,Y=y+Math.sin(t+i)*38;rect(X-58,Y-45,116,90,P[i%P.length],3);star(X,Y,25,P[(i+2)%P.length])}}
function clockCard(x,y,t){rect(x-180,y-159,360,319,C.cream,6);watch(x,y,113,t);poly([[x-127,y+123],[x-71,y+183],[x+111,y+183]],C.gold,3)}
function wheelchair(x,y,p){ell(x-120,y+85,70,70,C.cyan,6);ell(x+114,y+106,29,29,C.pink,5);head(x-12,y-132,50,C.gold,'smile',1,p);poly([[x+15,y-76],[x+35,y+36],[x-76,y+36],[x-126,y+79]],C.gold,6)}
function handshake(x,y,p){g.save();g.translate(x,y);g.rotate(Math.sin(p*TAU*2)*.02);poly([[-308,-54],[-178,-83],[-65,-16],[44,30]],C.cyan,15);poly([[305,-54],[168,-88],[50,-15],[-35,30]],C.pink,15);ell(0,8,60,44,C.gold,7);for(let j=0;j<4;j++)line(-44+j*23,28,-20+j*23,74,C.cream,4);g.restore()}
function brokenChain(x,y,p){for(let j=0;j<5;j++){const xx=x+(j-2)*160;ell(xx,y+Math.sin(j)*39,93,48,j===2?C.red:P[j%P.length],8,.85,Math.sin(j)*.23);if(j===2&&p>.49){cross(xx,y,34,C.red);star(xx,y+101,32,C.gold)}}}
function reel(x,y,t){ell(x,y,147,147,C.gold,8);ell(x,y,96,96,C.cream,3);for(let j=0;j<5;j++){let a=j*TAU/5+t*.6;ell(x+Math.cos(a)*80,y+Math.sin(a)*80,34,34,C.cyan,4)}line(x-180,y+142,x-264,y+209,C.gold,6)}
function curtain(x,y,p){for(let j=0;j<10;j++){let X=x-430+j*92;line(X,y-146,X+Math.sin(j+p*3)*30,y+164,C.gold,2,.45)}ribbon(x-420,y+137,842,22,C.cyan,p*3)}
function chapter(x,y,s,col=C.cream){rect(x-190,y-166,380,332,col,6);text(s,x,y,85,col)}
function whirl(x,y,t,col=C.cyan,n=6){for(let j=0;j<n;j++){let a=j*TAU/n+t*.5;let r=50+j*48;curve([[x,y],[x+r*Math.cos(a),y+r*Math.sin(a)],[x+r*.6*Math.cos(a+1.8),y+r*.6*Math.sin(a+1.8)],[x+r*Math.cos(a+3),y+r*Math.sin(a+3)]],P[j%P.length],5)}}
function outlineAsset(name,x,y,t,p){switch(name){case 'camera':rect(x-146,y-91,292,203,C.gold,7);ell(x,y,78,78,C.cyan,7);rect(x-101,y-116,80,27,C.pink,4);break;case 'magnifier':loupe(x,y,t);break;case 'plant':plant(x,y,p);break;case 'signature':scroll(x,y);pen(x+235,y+88,.7);break;case 'key':key(x,y,1.2);break;case 'gear':gearbox(x,y,110,t);break;case 'ship':ship(x,y,t);break;case 'path':decision(x,y,p);break;case 'clock':watch(x,y,124,t);break;}}
/* V5. Individually directed lyric tableaux built out of Chalked chalk-stroke primitives.
   Each composition is drawn with paths and remains deterministic at any timecode.
   Structural analogy is not attribution: video discourse vs submitted Chalked thesis. */
function hatching(x,y,w,h,col=C.cream,step=13){for(let k=0;k<w+h;k+=step){let a=Math.max(0,k-h),b=Math.min(w,k);if(b>a)line(x+a,y+Math.min(h,k),x+b,y+Math.max(0,k-w),col,1,.17)}}
function tag(s,x,y,col=C.gold){label(s,x,y,col,23)}
function arrowed(A,B,col=C.gold,w=5){line(A[0],A[1],B[0],B[1],col,w);let a=Math.atan2(B[1]-A[1],B[0]-A[0]);poly([[B[0]-19*Math.cos(a-.55),B[1]-19*Math.sin(a-.55)],B,[B[0]-19*Math.cos(a+.55),B[1]-19*Math.sin(a+.55)]],col,w)}
function globe(x,y,r,t){
 g.save();g.translate(x,y);let a=Math.sin(t*.14)*.10;
 ell(0,0,r,r,C.cyan,7);ell(0,0,r*.96,r*.96,C.cream,1,.38);
 for(let k=-2;k<=2;k++){let yy=k*r*.27;ell(0,yy,Math.sqrt(r*r-yy*yy),18+Math.abs(k)*5,C.mint,1.8,.38)}
 for(let k=-2;k<=2;k++){let dx=k*.22+a;ell(dx*r,0,r*(.25+Math.abs(dx)*.21),r,C.cyan,2,.47)}
 // Deliberately schematic coastlines, not a geographic navigation map.
 let land=[ [[-118,-114],[-151,-65],[-132,-17],[-98,9],[-89,49],[-47,53],[-45,109],[-16,149]], [[-28,-67],[28,-95],[72,-78],[100,-28],[91,33],[51,79],[20,115],[7,68],[-15,48]], [[33,-131],[82,-146],[129,-111],[148,-52],[120,-22],[89,-36],[53,-6]], [[108,90],[155,113],[155,135],[126,148],[100,121]] ];
 for(let j=0;j<land.length;j++){let pts=land[j].map(q=>[q[0]*r/180,q[1]*r/180]);poly(pts,P[(j+3)%P.length],5,.9)}
 for(let k=0;k<7;k++){let ang=t*.27+k*TAU/7;dot(Math.cos(ang)*r*.9,Math.sin(ang)*r*.9,3.5,C.gold,.65)}g.restore();
}
function storefront(x,y,z=1,t=0){g.save();g.translate(x,y);g.scale(z,z);
 rect(-158,-108,316,245,C.gold,6);rect(-129,2,255,132,C.cyan,4);rect(-93,34,91,98,C.cream,3);
 for(let i=0;i<6;i++){let a=-154+i*51;poly([[a,-109],[a+54,-109],[a+47,-49],[a,-49],[a,-109]],i%2?C.pink:C.cream,4)}
 text('SALE',0,-13,59,C.gold);text('%',77,84,56,C.pink);hatching(-126,8,237,112,C.gold,10);g.restore()}
function bowlSalt(x,y,z=1,t=0){g.save();g.translate(x,y);g.scale(z,z);
 // steaming pasta and a salt cellar; objects are chalk sketches, not typographic slides.
 ell(0,92,162,46,C.cream,7);curve([[-158,96],[-132,202],[145,199],[163,96]],C.cyan,7);ell(0,94,131,33,C.gold,4);
 for(let j=0;j<7;j++){let X=-108+j*34;curve([[X,78],[X-8,40+9*Math.sin(j)],[X+32,34],[X+28,76]],C.gold,3)}
 for(let j=0;j<3;j++)curve([[-86+j*81,10],[-131+j*81,-49],[-30+j*81,-36],[-47+j*81,-91]],C.cream,2,.5);
 g.save();g.translate(108,-143);g.rotate(-.38+Math.sin(t*2)*.05);rect(-35,-65,70,88,C.mint,5);ell(0,-66,34,12,C.cream,4);for(let j=0;j<4;j++)dot(-15+j*10,-63,2.7,C.light);g.restore();
 for(let j=0;j<9;j++){let X=90+j*14+Math.sin(t+j)*14,Y=-58+j*14+Math.cos(j+t)*19;dot(X,Y,2.8,C.light,.7)}g.restore()}
function textCloud(x,y,col,lines,t){g.save();for(let j=0;j<lines.length;j++){let yy=y+(j-(lines.length-1)/2)*63;ell(x,yy,175,34,j%2?C.cream:col,3,.8);text(lines[j],x,yy,24,col)}g.restore()}
function lensPrism(x,y,t){poly([[x-155,y+93],[x,y-165],[x+155,y+93],[x-155,y+93]],C.cream,7);
 line(x-295,y-11,x-96,y-12,C.light,8);for(let i=0;i<5;i++)arrowed([x+75,y+i*13-22],[x+296,y+i*35-96],P[i],4);star(x-286,y-12,13,C.light)}
function officeBuilding(x,y,z=1,col=C.gold){g.save();g.translate(x,y);g.scale(z,z);rect(-142,-229,284,355,col,8);for(let j=0;j<4;j++)for(let i=0;i<3;i++){rect(-113+i*83,-197+j*70,53,44,C.cream,2,.7);if((i+j)%2)fillRect(-108+i*83,-193+j*70,44,35,C.gold,.11)}rect(-31,22,62,104,C.cyan,4);g.restore()}
function bubbleHead(x,y,r,col,t,smile=false){head(x,y,r,col,smile?'smile':'question',1,t);for(let i=0;i<3;i++)dot(x+r*(.7+i*.2),y-r*(1.2+i*.16),3+i*2,col,.7)}
function ear(x,y,z=1,t=0){g.save();g.translate(x,y);g.scale(z,z);
 curve([[-20,126],[-159,46],[-75,-184],[53,-128]],C.gold,10);curve([[53,-128],[148,-91],[105,73],[28,126]],C.gold,10);
 curve([[28,126],[-62,144],[-58,19],[22,10]],C.cream,7);curve([[22,10],[64,-57],[-10,-107],[-44,-30]],C.cyan,6);
 for(let j=0;j<4;j++){let a=t*2-j*.55;ell(-191-j*26,-2,19+Math.sin(a)*4,62+j*16,C.pink,3,.7)}g.restore()}
function twoSignatures(x,y,t){paper(x-255,y,345,220,C.cyan,-.05);paper(x+254,y,345,220,C.pink,.06);
 text('AGREED',x-251,y-59,35,C.cyan);text('AGREED',x+252,y-59,35,C.pink);
 poly([[x-387,y+63],[x-342,y+79],[x-289,y+47],[x-252,y+82]],C.cyan,4);
 poly([[x+120,y+68],[x+166,y+54],[x+225,y+80],[x+285,y+50]],C.pink,4);
 tag('SAME MISSION',x,y-170,C.gold);arrowed([x-85,y-45],[x-147,y-65],C.gold);arrowed([x+86,y-45],[x+145,y-65],C.gold)}
function auditorium(x,y,t){g.save();g.translate(x,y);
 for(let k=4;k>=0;k--){let yy=225-k*79;ell(0,yy,450-k*45,45-k*3,k%2?C.gold:C.cream,3,.75);
 for(let j=0;j<6+k*2;j++){let xx=(j-(5+k*2)/2)*(58-k*2);dot(xx,yy-26,8.7,P[(j+k)%P.length],.85)}}
 rect(-143,-189,284,128,C.cyan,6);text('YOUR TURN',0,-125,31,C.light);poly([[-132,-48],[0,17],[134,-48]],C.cyan,5);g.restore()}
function forks(x,y,t,p){line(x,y+213,x,y+4,C.cyan,17);curve([[x,y+7],[x-47,y-101],[x-246,y-121],[x-342,y-206]],C.cyan,11);
 curve([[x,y+7],[x+56,y-83],[x+270,y-140],[x+369,y-192]],C.pink,11);
 arrowed([x-312,y-181],[x-361,y-214],C.cyan,8);arrowed([x+318,y-168],[x+387,y-202],C.pink,8);
 for(let j=0;j<7;j++){let k=j/6;dot(x-342*k,y-190*k,4,C.gold,.5)}
 if(p>.3){ell(x,y+2,23+12*Math.sin(t*2),23+12*Math.sin(t*2),C.gold,3);text('?',x,y-35,43,C.gold)}}
function fracturedMessage(x,y,p){paper(x,y,490,290,C.cream,-.04);text('AGREEMENT',x,y-74,44,C.light);
 let crack=[[x-74,y-25],[x-47,y+14],[x-72,y+40],[x-29,y+61],[x-10,y+98],[x+18,y+128]];
 trace(crack,C.red,8,1,p);for(let j=0;j<9;j++)dot(x-70+j*17,y+55,3,C.red,p)}
function valuesScale(x,y,t){line(x,y-172,x,y+189,C.gold,9);line(x-258,y-88,x+258,y-88,C.gold,10);ell(x,y-112,35,35,C.gold,5);
 for(let d of [-1,1]){let X=x+d*224,Y=y+20+wob(t+(d+2),.8,15);line(X,y-89,X,Y,C.gold,3);ell(X,Y+7,104,28,d<0?C.cyan:C.pink,5)}
 watch(x-225,y-16,63,t,true);for(let j=0;j<4;j++)dot(x+185+j*21,y-41,15,P[(j+2)%P.length]);
 text('SPEED',x-217,y+95,29,C.cyan);text('PEOPLE',x+225,y+95,29,C.pink)}
function inkDrop(x,y,s=1,col=C.cyan){g.save();g.translate(x,y);g.scale(s,s);curve([[0,-118],[-80,-17],[-86,85],[0,106]],col,7);curve([[0,106],[93,81],[78,-22],[0,-118]],col,7);ell(-24,47,17,26,C.light,2,.7);g.restore()}
function decisionGate(x,y,p,t){rect(x-309,y-210,618,376,C.cream,7);text('DECIDE?',x,y-110,54,C.gold);
 poly([[x-180,y-25],[x-55,y-25],[x-55,y+119],[x-180,y+119],[x-180,y-25]],C.cyan,5);
 poly([[x+64,y-25],[x+192,y-25],[x+192,y+119],[x+64,y+119],[x+64,y-25]],C.pink,5);
 text('NOW',x-118,y+43,35,C.cyan);text('LATER',x+130,y+43,32,C.pink);
 let px=x+(p-.5)*320;arrowed([x,y-57],[px,y+14],C.gold,6)}
function boomerangPath(x,y,p,t){
 const a=[];for(let j=0;j<=48;j++){let k=j/48*Math.PI*3.7;let r=265*(1-j/60);a.push([x+Math.cos(k)*r,y+Math.sin(k)*r*.68])}
 trace(a,C.green,10,1,p);const n=Math.max(0,Math.floor(p*48)),tip=a[n];star(...tip,18,C.gold);
 ell(x,y,20,20,C.cyan,4);tag('RETURN ≠ RESET',x,y+235,C.cream)}
function orchestra(x,y,t){for(let i=0;i<7;i++){let X=x+(i-3)*135,Y=y+Math.sin(i*1.7)*52;
 ell(X,Y-110,23,29,P[i%P.length],4);curve([[X-29,Y-49],[X-24,Y+25],[X+25,Y+31],[X+30,Y-50]],P[i%P.length],5);
 line(X+32,Y-20,X+83,Y-70,P[i%P.length],4);text('♪',X+92,Y-100+wob(t+i,3,17),38,P[i%P.length]);}}
function driftBoats(x,y,t){for(let k=0;k<2;k++){let X=x+(k?269:-269),Y=y+(k?42:-42)+wob(t+k,1.5,8),col=k?C.pink:C.cyan;
 poly([[X-132,Y],[X+129,Y],[X+94,Y+68],[X-107,Y+68],[X-132,Y]],col,6);
 line(X,Y,X,Y-166,col,5);poly([[X-2,Y-155],[X+100*(k?1:-1),Y-76],[X-2,Y-76]],C.cream,5);
 trace([[X-152,Y+98],[X-62,Y+90],[X+45,Y+99],[X+154,Y+88]],col,3);
 arrowed([X,Y-17],[X+(k?138:-138),Y-135],col,5)}}
function switchRail(x,y,t,p){
 for(let j of [-1,1])poly([[x-459,y+177+j*20],[x-120,y+77+j*20],[x+62,y+(-65+j*20)],[x+438,y-190+j*20]],C.cream,5);
 poly([[x-460,y+154],[x-125,y+53],[x+145,y+102],[x+433,y+163]],C.cyan,6);
 for(let j=0;j<15;j++){let X=x-430+j*58;line(X,y+135-j*9,X+12,y+186-j*9,C.gold,3,.5)}
 line(x+40,y+85,x+121,y-35+95*(1-p),C.pink,8);ell(x+40,y+85,17,17,C.gold,6);
 rect(x-368,y-17,200,77,C.cyan,6);text('NEXT',x-267,y+24,37,C.light)}
function lockKey(x,y,p){lock(x-250,y,1,C.gold,p>.47);key(x+207,y,1.16,C.cyan,-.4);arrowed([x+112,y+13],[x-104,y+12],C.green,7)}
function fingerprintPair(x,y,t){fingerprint(x-238,y,t,C.cyan);fingerprint(x+238,y,t+2,C.pink);
 arrowed([x-120,y-22],[x+104,y-22],C.gold,4);tag('NOT IDENTICAL',x,y+207,C.cream)}
function weatherUnknown(x,y,t){sun(x-239,y-139,62,t);cloud(x+220,y-164,.9,t);for(let j=0;j<8;j++)line(x+125+j*32,y-93,x+102+j*32,y-22,C.cyan,4,.5);
 text('?',x,y+98,116,C.gold);tag('NO GUARANTEES',x,y+209,C.cream)}
function cloud(x,y,s=1,t=0){g.save();g.translate(x,y);g.scale(s,s);
 curve([[-156,60],[-192,-20],[-126,-91],[-61,-68]],C.cream,7);curve([[-63,-66],[-20,-179],[100,-142],[114,-61]],C.cream,7);
 curve([[114,-62],[207,-58],[206,70],[141,77]],C.cream,7);line(-152,74,143,74,C.cream,7);g.restore()}
function runway(x,y,t){rect(x-487,y+142,971,34,C.cream,4);for(let j=0;j<13;j++)line(x-445+j*71,y+159,x-417+j*71,y+159,C.gold,3);
 poly([[x-253,y+10],[x+160,y+10],[x+285,y-20],[x+318,y-5],[x+153,y+69],[x-129,y+69],[x-253,y+10]],C.cyan,7);
 poly([[x-14,y+16],[x-94,y-88],[x+110,y-88],[x+171,y+18]],C.pink,6);for(let j=0;j<4;j++)line(x-398-j*53,y+36,x-354-j*53,y+36,C.gold,2);
 watch(x+350,y-130,65,t,true)}
function noticeLatency(x,y,p,t){lighthouse(x-241,y+25,t);watch(x+244,y+10,111,t,true);line(x-76,y-6,x+62,y-6,C.gold,6);
 for(let j=0;j<4;j++)ell(x-52+j*29,y-7,10+j*25,24+j*14,C.red,1.8,.35);
 tag('TIME TO NOTICE',x,y+240,C.cream)}
function constructionCost(x,y,p,t){
 // The same crane must re-lift the beam when the plan is recalled.
 line(x+170,y-234,x+170,y+169,C.gold,8);line(x-225,y-204,x+250,y-204,C.gold,8);line(x+170,y-235,x-191,y-204,C.gold,4);
 line(x-42,y-203,x-42,y+18+p*87,C.gold,4);rect(x-183,y+17+p*86,278,66,C.cyan,7);text('REWORK',x-45,y+52+p*86,31,C.cream);
 for(let i=0;i<4;i++)rect(x-430+i*161,y+147,144,77,P[i],4);
 text('TIME',x+308,y+64,36,C.gold);watch(x+308,y-23,55,t,true)}
function gardenDifferent(x,y,t,p){
 const cols=[C.cyan,C.pink,C.gold,C.green,C.violet];
 for(let i=0;i<5;i++){let X=x+(i-2)*185,Y=y+117;
 line(X,Y,X,Y-130-30*Math.sin(i),cols[i],7);for(let j=0;j<2;j++)ell(X+(j?45:-45),Y-70-j*23,46,17,cols[i],4,.86,j?.45:-.45);
 if(i%2)flower(X,Y-152,.72,t+2*i,cols[i]);else if(i%3)star(X,Y-163,39,cols[i]);else sproutLogo(X,Y-162,.33,t);
 }
 line(x-500,y+145,x+500,y+145,C.cream,7);tag('SHARED SOIL · DIFFERENT BLOOMS',x,y+219,C.cream)}
function cityContributors(x,y,t,p){skyline(x,y+136,.90,t,C.violet);bridge(x,y+191,.40,C.cyan);
 for(let i=0;i<6;i++){let X=x-435+i*171;star(X,y-207+wob(t+i,.7,13),15,P[i]);arrowed([X,y-150],[X,y+35],P[i],3)}
 ell(x+385,y-188,52,52,C.gold,5);for(let j=0;j<7;j++)dot(x-310+j*97,y+183,6,P[j%P.length],.9)}
function notebookQuestion(x,y,p,t){book(x,y,t);text('WHY?',x-132,y-34,42,C.cyan);text('WHO?',x+144,y-34,42,C.pink);
 for(let j=0;j<6;j++){let X=x-235+j*91,Y=y-177+Math.sin(t+j)*16;star(X,Y,13,P[j])}tag('ASK BEFORE ACTING',x,y+228,C.gold)}
function personTarget(x,y,t){head(x-280,y,115,C.cyan,'question',1,t);head(x+280,y,115,C.pink,'thought',-1,t);
 curve([[x-148,y-35],[x-62,y-145],[x+66,y-145],[x+148,y-35]],C.gold,5);star(x,y-154,19,C.gold);}
function paperAirplane(x,y,z=1,a=0,col=C.cyan){g.save();g.translate(x,y);g.rotate(a);g.scale(z,z);poly([[-160,40],[172,-30],[-41,121],[-24,49],[-160,40]],col,7);poly([[172,-30],[-24,49],[-43,120]],C.cream,4);line(-24,49,172,-30,C.gold,3);g.restore()}
function relayChain(x,y,p,t){let n=Math.max(1,Math.floor(11*p));for(let j=0;j<n;j++){let X=x-480+j*93,Y=y+Math.sin(j*1.5)*90;
 if(j)arrowed([X-82,Y+10],[X-24,Y+10],P[(j+2)%P.length],3);
 rect(X-35,Y-35,70,72,j?C.pink:C.cyan,4);text(j?'?':'!',X,Y,32,j?C.red:C.green)}
 tag('A GUESS BECOMES A PLAN',x,y+225,C.red)}
function archiveRecord(x,y,p){cabinet(x-225,y,150+p*3);paper(x+212,y-43,290,200,C.green,-.03);
 text('DECIDED',x+212,y-86,41,C.green);tick(x+216,y+30,39,C.green);
 arrowed([x+62,y+27],[x+119,y+27],C.gold,6)}
function captainWithoutControls(x,y,t){head(x-282,y,115,C.cyan,'question',1,t);ship(x+256,y+56,t);helm(x-11,y+202,49,t);
 line(x+31,y+180,x+155,y+65,C.red,5);cross(x+92,y+124,32,C.red);tag('TITLE ≠ CONTROL',x,y-198,C.gold)}
function compassFuture(x,y,t,p){globe(x-240,y,150,t);paperAirplane(x+266-63*p,y+21,1.05,-.14,C.gold);
 arrowed([x-68,y+68],[x+106,y+13],C.green,5);tag('THE FUTURE CAN CHANGE',x,y+229,C.cream)}
function brokenForum(x,y,t){auditorium(x,y+75,t);rect(x-135,y-136,270,70,C.red,5);text('NO CONFIDENCE',x,y-101,25,C.red);
 star(x-293,y-167,22,C.gold);star(x+293,y-167,22,C.gold)}
function clockVsSparks(x,y,t){watch(x-296,y,104,t,true);for(let j=0;j<12;j++){let X=x+80+j*45,Y=y-164+(j%3)*70;
 rect(X-11,Y-13,22,26,P[j%P.length],2);if(j)line(X-36,Y-1,X-18,Y-1,C.gold,2,.5)}
 tag('FASTER THAN RECONSTRUCTION',x,y+239,C.cream)}
function parliament(x,y,p,t){auditorium(x,y+71,t);speech(x,y-175,324,69,'REOPEN THE CHOICE',C.green);star(x-314,y-159,24,C.gold)}
function chordPath(x,y,t,p){
 const start=[x-429,y+92],end=[x+419,y-78];
 trace([[x-429,y+92],[x-209,y-132],[x+26,y+160],[x+270,y-105],end],C.green,12,1,p);
 for(let j=0;j<7;j++)star(x-375+j*122,y-210+(j%3)*14,13,P[j%P.length]);pen(x-160+p*630,y-80-p*10,.60,C.gold)}
function makeMarkRights(x,y,t,p){rect(x-449,y-208,897,419,C.cream,6);
 for(let j=0;j<3;j++){let X=x-278+j*278;ell(X,y-69,91,91,P[j*2],5);text(['EYE','PEN','ERASER'][j],X,y+58,23,P[j*2]);}
 loupe(x-282,y-67,t);pen(x,y-69,.42,C.gold);eraser(x+277,y-73,-.17);
 tag('ACCESS  /  WRITE  /  REVISE',x,y+169,C.light)}

// Per-line storyboard overrides. All other lines still have separately designed V4
// sketched scenes, but high-repetition clusters are replaced by these new vignettes.
const V5SCENES={
 0:(p,t)=>{bubbleHead(455,353,123,C.cyan,t,true);speech(858,295,288,105,'YES',C.cyan);inkDrop(852,461,.68,C.gold)},
 1:(p,t)=>{bubbleHead(806,351,125,C.pink,t,true);speech(426,291,288,105,'YES',C.pink);fingerprint(438,466,t,C.gold)},
 2:(p,t)=>{globe(638,347,185,t);storefront(226,363,.86,t);bowlSalt(1046,349,.90,t);tag('SALE',640,124,C.gold);
               tag('ENGLISH: A DISCOUNT',236,563,C.cyan);tag('ITALIAN: SALT',1035,563,C.pink);
               // One spelling, two intended readings. Neither reading is 'incorrect'.
               arrowed([492,258],[386,301],C.cyan,4);arrowed([784,257],[897,301],C.pink,4)},
 5:(p,t)=>twoSignatures(638,358,t),
 7:(p,t)=>{ear(355,377,1.1,t);textCloud(911,348,C.cyan,['I HEARD','YOUR WORDS'],t);arrowed([516,360],[718,360],C.gold,6)},
 9:(p,t)=>{lensPrism(643,341,t);tag('SAME MESSAGE',334,204,C.cyan);tag('DIFFERENT WEIGHTS',934,535,C.pink)},
 10:(p,t)=>forks(640,360,t,p),
 11:(p,t)=>fracturedMessage(641,351,p),
 12:(p,t)=>{valuesScale(639,348,t);tag('WORDS ≠ VALUES',640,594,C.gold)},
 13:(p,t)=>{paperAirplane(280+400*p,357,1.24,.05,C.gold);trace([[116,518],[391,474],[601,535],[891,390],[1150,447]],C.cyan,7,1,p);
                tag('WHILE THE LINE IS LOOSE',650,198,C.cream)},
 14:(p,t)=>{inkDrop(380,360,1.1,C.cyan);inkDrop(647,386,.65,C.gold);watch(954,348,120,t,true);tag('BEFORE IT SETS',640,542,C.gold)},
 15:(p,t)=>{decisionGate(642,365,p,t);eraser(438+370*p,535,-.20);tag('RECONVENE',641,161,C.green)},
 16:(p,t)=>{chordPath(640,349,t,p);tag('DRAW ANOTHER FUTURE',640,578,C.gold)},
 17:(p,t)=>{paperAirplane(368+355*p,330,1.13,-.13,C.cyan);hand(955,390,1.1,-.2,C.pink);
                 trace([[277,514],[348,465],[496,518],[688,465]],C.gold,5,1,p);tag('ROOM TO ACT',640,172,C.cream)},
 18:(p,t)=>{bubbleHead(411,352,102,C.cyan,t);bubbleHead(887,352,102,C.pink,t);forks(643,319,t,p);tag('ROOM TO RECONSIDER',639,569,C.gold)},
 19:(p,t)=>{fracturedMessage(499,366,p);eraser(920-235*p,399,-.18);tag('NOT THE SAME OLD PLAN',637,157,C.green)},
 20:(p,t)=>auditorium(642,370,t),
 21:(p,t)=>driftBoats(641,371,t),
 22:(p,t)=>switchRail(646,342,t,p),
 23:(p,t)=>{makeMarkRights(637,365,t,p);hand(1119,443,.52,-.18,C.cyan)},
 24:(p,t)=>boomerangPath(641,355,p,t),
 25:(p,t)=>{chordPath(636,355,t,p);star(1125,243,50,C.gold)},
 27:(p,t)=>{bridge(642,383,1.27,C.green);driftBoats(640,428,t);tag('WE SHARE A MILE',641,169,C.cream)},
 28:(p,t)=>{notebookQuestion(638,368,p,t);tag('UNANSWERED',641,134,C.gold)},
 29:(p,t)=>gardenDifferent(635,353,t,p),
 30:(p,t)=>{sign(375,347,t);auditorium(871,380,t);tag('VISIBLE TO ALL',635,170,C.cream)},
 31:(p,t)=>{paper(361,357,307,257,C.cyan,-.07);text('TO: A',362,306,46,C.cyan);text('B READS IT',363,396,26,C.gold);
                 arrowed([514,363],[758,363],C.cream,6);head(915,364,113,C.pink,'question',1,t);tag('READ ≠ ADDRESSED',640,586,C.gold)},
 32:(p,t)=>makeMarkRights(641,356,t,p),
 34:(p,t)=>{compassFuture(638,347,t,p);tag('TOMORROW IS NEW',644,161,C.green)},
 35:(p,t)=>{rect(314,241,650,252,C.cream,5);star(361,320,33,C.cyan);star(921-268*p,321,33,C.gold);
               arrowed([413,407],[813-265*p,407],C.green,7);tag('MOVE THE DESTINATION',638,578,C.gold)},
 36:(p,t)=>{lighthouse(369,395,t);microphone(890,360,t,C.cyan);cross(763,357,39,C.red);tag('WARNING ≠ AUTHORITY',640,562,C.red)},
 38:(p,t)=>{brokenForum(637,375,t);eraser(987-330*p,467,-.16)},
 39:(p,t)=>{switchRail(642,354,t,p);tag('REVISE THE ROUTE',638,556,C.green)},
 40:(p,t)=>{hand(403,360,1.03,.14,C.cyan);paperAirplane(706+256*p,368,.90,-.2,C.pink);
                trace([[433,488],[590,539],[750,490],[950,545]],C.gold,6,1,p);tag('DELEGATE THE MOTION',638,174,C.cream)},
 41:(p,t)=>{twoSignatures(640,348,t);boomerangPath(640,400,p,t)},
 42:(p,t)=>{decisionGate(640,346,p,t);eraser(640+150*p,512,-.17);tag('OPEN A NEW OPTION',640,158,C.gold)},
 43:(p,t)=>auditorium(641,361,t),
 44:(p,t)=>{driftBoats(644,365,t);watch(640,533,65,t,true);tag('NOTICE THE DRIFT',640,145,C.gold)},
 45:(p,t)=>switchRail(636,365,t,p),
 46:(p,t)=>{lockKey(646,340,p);fingerprint(431,544,t,C.cyan);tag('AUTHORITY TO REVISE',640,167,C.gold)},
 47:(p,t)=>{officeBuilding(293,377,.74,C.cyan);officeBuilding(1001,377,.74,C.violet);envelope(633,380,246,162,C.gold);
                arrowed([416,355],[518,355],C.cyan);arrowed([746,355],[871,355],C.violet);tag('CHECKED SENT MAIL',639,559,C.cream)},
 48:(p,t)=>{envelope(348,372,262,180,C.cyan,true);rect(748,250,271,251,C.red,7);
                text('OPEN?',883,373,54,C.red);star(1006,273,29,C.red);tag('FALSE INFERENCE',643,551,C.gold)},
 49:(p,t)=>archiveRecord(654,355,p),
 50:(p,t)=>{sun(278,235,72,t);watch(278,451,100,t);auditorium(849,369,t);tag('MORNING PLAN CONTINUES',719,565,C.red)},
 51:(p,t)=>relayChain(641,355,p,t),
 52:(p,t)=>{relayChain(634,352,p,t);text('ASSUMPTION',636,167,43,C.red)},
 53:(p,t)=>archiveRecord(653,350,p),
 54:(p,t)=>{brokenChain(642,374,p);hand(976,324,.69,-.29,C.cyan);tag('WITHDRAW THE MANDATE',640,549,C.green)},
 55:(p,t)=>{factory(t);for(let i=0;i<6;i++)gearbox(225+i*167,512,36,t*(i%2?-5:5),P[i]);tag('PLANS PER SECOND',642,175,C.gold)},
 56:(p,t)=>clockVsSparks(642,345,t),
 57:(p,t)=>{runway(642,374,t);hand(407,312,.61,.28,C.cyan);tag('ACTION OUTRUNS REVIEW',640,169,C.red)},
 58:(p,t)=>{auditorium(641,349,t);watch(1052,198,79,t,true);cross(641,178,28,C.red);tag('NO TIME TO OBJECT',639,555,C.red)},
 59:(p,t)=>{ship(669,407,t);badge(406,228,C.cyan);tag('CAPTAIN NAMED',640,165,C.gold)},
 60:(p,t)=>captainWithoutControls(641,349,t),
 61:(p,t)=>{switchRail(637,355,t,0);lock(1049,241,.61,C.red);cross(878,346,34,C.red);tag('COURSE FROZEN',633,548,C.red)},
 62:(p,t)=>captainWithoutControls(642,340,t),
 63:(p,t)=>{loupe(379,363,t);paper(869,353,369,239,C.cream,.04);tag('ACCESS',367,539,C.cyan);tag('NOT THE ADDRESSEE',865,536,C.pink)},
 64:(p,t)=>{pen(374,326,.53,C.gold);paper(886,351,407,292,C.cream,.04);fingerprint(884,364,t,C.cyan);
                 tag('WHO MAY WRITE?',638,542,C.gold)},
 65:(p,t)=>{eraser(632,353,-.16);hand(392,421,.84,.13,C.cyan);lock(906,336,.79,C.gold,p>.7);
                tag('WHO MAY REVISE?',640,542,C.gold)},
 66:(p,t)=>parliament(641,354,p,t),
 67:(p,t)=>weatherUnknown(643,366,t),
 68:(p,t)=>runway(635,355,t),
 69:(p,t)=>noticeLatency(640,370,p,t),
 70:(p,t)=>constructionCost(645,365,p,t),
 71:(p,t)=>{gardenDifferent(641,353,t,p);eraser(992-194*p,534,-.23)},
 72:(p,t)=>chordPath(639,355,t,p),
 73:(p,t)=>{handshake(643,350,p);paperAirplane(640,179,.55,-.18,C.green);tag('AUTONOMY IS REAL',640,559,C.gold)},
 74:(p,t)=>gardenDifferent(638,344,t,p),
 75:(p,t)=>{cityContributors(641,365,t,p);tag('NEW SHARED WORLD',637,145,C.gold)},
 76:(p,t)=>auditorium(638,367,t),
 77:(p,t)=>{driftBoats(642,360,t);loupe(633,496,t);tag('OBSERVE · REVISE',641,158,C.gold)},
 78:(p,t)=>switchRail(645,349,t,p),
 79:(p,t)=>{hand(386,385,1.10,-.14,C.cyan);eraser(772-225*p,367,-.20);tag('HUMAN REVISION AUTHORITY',728,170,C.gold)},
 80:(p,t)=>{bubbleHead(396,351,115,C.cyan,t,true);speech(842,351,346,107,'YES',C.cyan)},
 81:(p,t)=>{bubbleHead(873,353,115,C.pink,t,true);speech(410,351,330,105,'YES',C.pink)},
 82:(p,t)=>notebookQuestion(635,355,p,t),
 83:(p,t)=>boomerangPath(642,355,p,t),
 84:(p,t)=>cityContributors(640,352,t,p)
};

function scene(i,p,t,dur){
 if(Object.prototype.hasOwnProperty.call(V5SCENES,i)){V5SCENES[i](p,t);return;}
 const e=ease(p),b=beat(t),d=p*dur;
 switch(i){
 // Intro: the same answer conceals different futures.
 case 0: head(600,362,142,C.cyan,'smile',1,t);speech(886,214,228,81,'YES',C.cyan);star(396,290,49,C.gold);break;
 case 1: head(673,351,140,C.pink,'question',-1,t);speech(933,207,228,81,'YES',C.pink);fingerprint(375,355,t,C.pink);break;
 case 2: watch(333,337,139,t);table(892,325,t);line(624,174,624,543,C.cream,3,.5);route(429,517,-.5,180,C.cyan,t);route(811,525,3.4,169,C.pink,t);break;
 // First verse: distinct human priorities, not a language bug.
 case 3: car(345+e*350,385,1.2,t);checkered(1035,287,t);watch(262,203,65,t,true);break;
 case 4: table(645,354,t);speech(330,165,223,56,'WHO?',C.pink);speech(970,166,270,56,'AFFECTED?',C.cyan);break;
 case 5: scroll(466,364,1.03);badge(885,367,C.gold);arrow(640,344,773,345,C.green);tick(462,354,45,C.green);break;
 case 6: balance(634,355,t);watch(452,323,50,t,true);flower(817,314,.58,t,C.pink);break;
 case 7: head(329,370,98,C.cyan,'thought',1,t);speech(682,206,250,68,'I HEARD...',C.cyan);head(990,385,102,C.pink,'question',-1,t);arrow(585,404,824,400,C.gold);break;
 case 8: mapRoad([[140,517],[298,446],[443,495],[600,337],[767,400],[932,242],[1116,292]],C.cyan,e);car(326+550*e,439-e*124,.53,t);star(1000,199,20,C.gold);break;
 case 9: book(641,351,t);speech(332,191,270,61,'SAME WORDS',C.cyan);speech(962,194,270,61,'DIFFERENT LIVES',C.pink);cross(640,508,29,C.gold);break;
 case 10: decision(638,335,e);head(439,533,55,C.cyan,'thought',1,t);head(846,533,55,C.pink,'question',-1,t);break;
 // Pre-chorus: detection does not choose values for us.
 case 11: paper(496,358,445,314,C.cream,-.11);loupe(878,385,t);line(456,295,549,380,C.red,7);line(547,297,450,393,C.red,7);break;
 case 12: balance(633,357,t,C.cyan,C.pink);speech(340,225,205,52,'FAST',C.cyan);speech(936,225,245,52,'FAIR',C.pink);break;
 case 13: pen(983-360*e,330,.63,C.gold);trace([[159,425],[386,358],[602,418],[801,347],[1080,390]],C.cyan,9,1,e);star(252,281,22,C.green);break;
 case 14: scroll(504,335,1.10);droplet(885,333,1.08,C.cyan);sun(1022,217,53,t);for(let j=0;j<8;j++)dot(673+j*27,479-j%2*12,2,C.cream,.5);break;
 // Choruses: the action is a new sketch, not merely a title card.
 case 15: easel(629,345,t);hand(1008,413,.92,-.72,C.cyan);eraser(330+220*e,484,-.18);break;
 case 16: trace([[184,430],[347,343],[505,407],[681,301],[863,371],[1081,275]],C.green,12,1,e);pen(230+830*e,332-80*e,.7,C.gold);star(1021,260,28,C.gold);break;
 case 17: handshake(640,361,e);key(641,515,.72,C.gold,Math.sin(t)*.04);break;
 case 18: decision(643,341,e,1);key(641,277,.63,C.gold,-.20);star(401,496,22,C.cyan);star(880,496,22,C.pink);break;
 case 19: easel(639,340,t);flower(629,321,1.2,t,C.green);eraser(352+430*e,492,.12);break;
 case 20: table(646,326,t);for(let j=0;j<8;j++){let a=j*TAU/8+t*.12;star(640+Math.cos(a)*480,346+Math.sin(a)*235,17,P[j%P.length])}break;
 case 21: compass(385,346,146,t,1,C.cyan);compass(913,346,146,t,-1,C.pink);route(523,488,-.10,245,C.gold,t);break;
 case 22: helm(534,331,139,t);key(930,355,.97,C.green,Math.PI/2);arrow(707,366,821,371,C.cyan,7);tick(1032,445,32,C.green);break;
 case 23: hand(533,352,1.38,-.37,C.cyan);eraser(912-145*e,413,-.20);lock(981,239,.64,C.gold,true);break;
 case 24: mandala(641,338,200,t);arrow(897,501,1067,452,C.gold);star(313,513,25,C.pink);break;
 case 25: easel(642,353,t);pen(418+377*e,376,.59,C.gold);trace([[353,484],[467,441],[589,480],[710,420],[814,442]],C.pink,9,1,e);break;
 // Second verse: overlapping but not identical purposes, addressees and authority.
 case 26: compass(348,346,141,t,1,C.cyan);compass(926,346,141,t,-1,C.pink);line(626,155,626,549,C.cream,2,.5);break;
 case 27: bridge(625,392,1.35,C.green);car(288+620*e,460,.55,t);ribbon(154,550,975,19,C.cyan,t*.4);break;
 case 28: book(638,367,t);text('?',641,278,165,C.gold);star(442,204,23,C.pink);star(841,213,23,C.cyan);break;
 case 29: watch(396,341,113,t);watch(894,341,113,t+2.4);ribbon(407,505,469,24,C.green,t*.12);break;
 case 30: sign(633,365,t);book(318,384,t);star(955,275,32,C.gold);break;
 case 31: sign(350,361,t);envelope(838,349,205,141,C.pink,true);arrow(516,364,730,372,C.gold,7);speech(961,204,265,60,'FOR WHOM?',C.pink);break;
 case 32: book(325,379,t);pen(656,357,.78,C.cyan);eraser(978,399,-.24);line(437,519,862,519,C.cream,3,.34);break;
 case 33: door(644,369,111.5+e*3.7);key(940-285*e,377,.93,C.gold,.20);plant(303,385,.4+e*.6,C.green);break;
 case 34: skyline(632,524,1.02,t,C.cyan);sun(954,229,72,t);watch(308,244,66,t);break;
 case 35: goal(643,347,e);car(330+446*e,470,.52,t);star(880,206,39,C.gold);break;
 case 36: lighthouse(405,395,t);speech(855,250,345,63,'WARNING!',C.red);for(let j=0;j<4;j++)ell(575+j*80,369,60,28,C.gold,2,.42);break;
 case 37: helm(400,351,120,t);ship(915,397,t);cross(658,339,37,C.red);line(530,342,783,387,C.gold,3,.45);break;
 // Second chorus: independently devised revisions rather than identical repeats.
 case 38: easel(646,350,t);sproutLogo(640,349,1.15,t);for(let j=0;j<5;j++)star(229+j*204,188,18,P[j]);break;
 case 39: pen(230+620*e,352,.74,C.cyan);curve([[230,491],[398,268],[657,539],[1030,320]],C.green,10);star(990,279,40,C.gold);break;
 case 40: hand(389,345,.91,.55,C.cyan);key(672,376,1.15,C.gold,.35);hand(978,345,.91,-.55,C.pink);break;
 case 41: plant(651,399,e,C.green);decision(648,385,e,1);star(892,225,21,C.pink);break;
 case 42: easel(642,365,t);eraser(309+410*e,431,-.2);sun(779,257,56,t);star(454,490,31,C.pink);break;
 case 43: table(652,347,t);speech(333,205,176,53,'INVITED',C.cyan);speech(1001,208,184,53,'HEARD',C.pink);break;
 case 44: watch(389,357,146,t);compass(895,357,141,t,-1,C.pink);route(538,482,-.14,207,C.green,t);break;
 case 45: helm(515,373,121,t);arrow(687,390,848,367,C.green,7);badge(942,360,C.cyan);tick(936,370,42,C.green);break;
 case 46: eraser(665,359,-.26);hand(372,397,.79,.42,C.cyan);lock(977,327,.88,C.gold,true);star(828,219,39,C.green);break;
 // The specific failed handoff recounted by David.
 case 47: robot(255,365,1.24,t,C.cyan);envelope(623,329,235,164,C.gold);robot(999,365,1.24,t,C.violet);arrow(415,359,511,359,C.gold,5);arrow(735,359,864,359,C.gold,5);break;
 case 48: envelope(367,364,210,130,C.cyan);scroll(875,347,.86,C.red);text('?',877,345,100,C.red);lock(866,551,.39,C.red,true);break;
 case 49: cabinet(648,356,148+e*4);envelope(663,296,149,96,C.green,true);loupe(946,439,t);arrow(534,415,636,353,C.gold,5);break;
 case 50: sun(293,246,87,t);table(860,343,t);scroll(371,431,.64,C.pink);watch(293,506,51,t);break;
 case 51: mailStack(408,343,t,5);line(204,471,1095,471,C.red,7,.7);star(204+870*e,473,25,C.red);break;
 case 52: connectedDots(643,337,t,7,e,C.red);lock(1079,493,.49,C.gold);cross(316,502,34,C.red);break;
 case 53: cabinet(390,363,151.3);loupe(828,371,t);book(991,436,t);arrow(679,367,777,369,C.green,5);break;
 case 54: brokenChain(650,343,e);eraser(636,200+260*e,.05);star(641,515,39,C.green);break;
 // Acceleration: plans outrun reconstructive and governing capacity.
 case 55: factory(t);gearbox(254,524,77,t*4,C.pink);watch(1002,516,67,t,true);break;
 case 56: scroll(477,366,.9);for(let j=0;j<13;j++)line(686,177+j*24,1114,177+j*24,C.gold,2,.35);watch(954,356,89,t,true);break;
 case 57: hand(367,371,.9,.55,C.cyan);hand(897,371,.9,-.55,C.pink);gearbox(638,352,121,t*4,C.gold);break;
 case 58: microphone(376,362,t,C.cyan);watch(905,363,118,t,true);cross(646,408,35,C.red);break;
 case 59: ship(630,398,t);flag(721,258,C.cyan,104);badge(372,310,C.cyan);break;
 case 60: ship(455,389,t);helm(1021,329,98,t);cross(796,356,46,C.red);break;
 case 61: compass(396,350,141,t,-1,C.pink);route(565,420,-.3,360,C.red,t);lock(936,389,.71,C.red);break;
 case 62: helm(477,361,133,t);head(905,376,115,C.cyan,'question',-1,t);speech(884,203,275,54,'IN CHARGE?',C.gold);break;
 // Breakdown: separate the permissions, restore deliberative choice.
 case 63: book(417,379,t);envelope(880,335,204,142,C.pink,true);arrow(525,486,738,465,C.gold,5);break;
 case 64: pen(398,373,.83,C.cyan);scroll(848,376,1.03,C.gold);fingerprint(916,383,t,C.cyan);break;
 case 65: lock(447,347,1.1,C.gold,false);hand(818,400,1.09,.10,C.cyan);eraser(932,309,-.23);break;
 case 66: table(632,321,t);decision(634,330,e,1);speech(1006,219,230,58,'REOPEN',C.green);break;
 case 67: sun(974,205,93,t);scroll(478,374,1.08,C.cream);text('?',482,368,127,C.gold);star(730,518,28,C.pink);break;
 case 68: car(363+210*e,443,1.08,t);watch(929,329,118,t,true);arrow(657,490,772,484,C.gold,5);break;
 case 69: hourglass(425,374,t);loupe(906,379,t);text('NOTICE',645,525,43,C.cyan);break;
 case 70: balance(650,357,t,C.green,C.red);eraser(991-225*e,521,-.12);scroll(340,475,.42,C.pink);break;
 // Final chorus: revision as a shared activity, not a return to a fixed original.
 case 71: easel(635,349,t);sproutLogo(629,344,1.04,t);eraser(980-330*e,514,-.17);break;
 case 72: pen(280+715*e,356,.65,C.gold);ribbon(181,427,898,62,C.green,t*.23);sun(1050,196,48,t);break;
 case 73: handshake(645,336,e);key(627,531,.64,C.gold);star(647,218,38,C.green);break;
 case 74: flower(454,350,1.26,t,C.cyan);flower(841,350,1.26,t+1,C.pink);ribbon(435,515,418,22,C.green,t*.4);break;
 case 75: easel(640,365,t);skyline(648,454,.53,t,C.violet);fountain(642,433,.46,t,C.cyan);break;
 case 76: table(640,347,t);for(let j=0;j<7;j++)star(218+j*140,183+wob(t+j,.6,15),17,P[j%P.length]);break;
 case 77: compass(432,342,124,t,1,C.cyan);ribbon(591,489,479,53,C.pink,t*.3);loupe(894,349,t);break;
 case 78: helm(397,352,133,t);arrow(561,361,750,359,C.green,7);ship(984,408,t);tick(839,286,37,C.green);break;
 case 79: hand(427,383,1.12,.22,C.cyan);eraser(844-158*e,371,-.20);lock(1035,421,.59,C.gold,true);break;
 // Outro: new meanings, not the old slate restored.
 case 80: head(611,350,149,C.cyan,'smile',1,t);speech(902,206,212,71,'YES',C.cyan);break;
 case 81: head(639,350,149,C.pink,'smile',-1,t);speech(942,203,212,71,'YES',C.pink);break;
 case 82: book(635,382,t);speech(334,229,175,67,'WHY?',C.cyan);speech(972,230,177,67,'WHO?',C.pink);star(633,192,28,C.gold);break;
 case 83: mandala(636,360,175,t);ribbon(203,514,864,52,C.green,t*.25);arrow(947,535,1082,485,C.gold);break;
 case 84: skyline(625,512,.64,t,C.violet);house(337,464,.61,C.gold);bridge(632,499,.45,C.cyan);tree(993,418,.70,t,C.green);sproutLogo(637,325,.78,t);sun(1045,222,61,t);break;
 default: text('SKETCH '+i,640,351,85,C.gold);
 }
}

const LINES=[{"start":5.06,"text":"You said yes"},{"start":8.88,"text":"I said yes"},{"start":12.1,"text":"Same word, different worlds"},{"start":28.97,"text":"I was racing for the finish"},{"start":32.72,"text":"You were asking who's affected"},{"start":36.55,"text":"We both understood the mission"},{"start":39.42,"text":"But we weighed it different ways"},{"start":43.17,"text":"When you told me what you'd heard"},{"start":45.11,"text":"I could see the road you'd taken"},{"start":47.02,"text":"Not a failure of the language"},{"start":48.99,"text":"Just a choice we hadn't made"},{"start":50.83,"text":"A clearer note can show the crack"},{"start":52.68,"text":"Can't tell us what to prize"},{"start":54.56,"text":"So tell me while the line is loose"},{"start":56.61,"text":"Before the ink has dried"},{"start":60.06,"text":"Back to the drawing board!"},{"start":62.91,"text":"Draw another line"},{"start":64.6,"text":"Trust is giving room to move"},{"start":66.54,"text":"And room to change our minds"},{"start":67.89,"text":"Back to the drawing board!"},{"start":69.83,"text":"Call the whole room in"},{"start":71.8,"text":"How soon do we know we're drifting?"},{"start":75.51,"text":"Who can change what happens next?"},{"start":78.86,"text":"Who holds the eraser?"},{"start":83.79,"text":"Round and round, not the same again"},{"start":87.64,"text":"Draw it, draw it, draw it again!"},{"start":91.73,"text":"Your compass isn't my compass"},{"start":95.42,"text":"Still our roads can share a mile"},{"start":99.3,"text":"We can leave a question open"},{"start":103.12,"text":"Let the difference stay awhile"},{"start":105.95,"text":"Everyone can read the signpost"},{"start":107.92,"text":"Not everyone is who it's for"},{"start":109.71,"text":"Who can write and who can wipe it?"},{"start":111.43,"text":"Who gets to reopen the door?"},{"start":113.79,"text":"Tomorrow brings a different world"},{"start":115.57,"text":"The goal can change as well"},{"start":117.86,"text":"A warning isn't power"},{"start":119.76,"text":"If no one gets to steer"},{"start":122.86,"text":"Back to the drawing board!"},{"start":125.66,"text":"Draw another line"},{"start":127.31,"text":"Trust is giving room to move"},{"start":129.29,"text":"And room to change our minds"},{"start":130.68,"text":"Back to the drawing board!"},{"start":132.59,"text":"Call the whole room in"},{"start":134.55,"text":"How soon do we know we're drifting?"},{"start":138.23,"text":"Who can change what happens next?"},{"start":141.59,"text":"Who holds the eraser?"},{"start":146.37,"text":"Two agents checked the sent mail"},{"start":148.02,"text":"Said the choice was open still"},{"start":149.97,"text":"But the answer lived in another record"},{"start":152.07,"text":"And the morning plan went on"},{"start":153.63,"text":"Each new handoff held the first guess"},{"start":155.72,"text":"Every step depended on it"},{"start":157.51,"text":"Till we checked it with the record"},{"start":159.45,"text":"And we saw where it went wrong"},{"start":161.71,"text":"Faster, faster, plans are turning"},{"start":163.18,"text":"Faster than the room can read"},{"start":165.54,"text":"Faster, faster, hands are moving"},{"start":167.08,"text":"Past the chance to disagree"},{"start":168.95,"text":"You can name a human captain"},{"start":170.86,"text":"Of a ship they cannot steer"},{"start":172.74,"text":"If they cannot change the heading"},{"start":174.63,"text":"What does being in charge mean here?"},{"start":180.33,"text":"Who can read it? (Who is it for?)"},{"start":182.37,"text":"Who can write it? (Who holds the board?)"},{"start":184.21,"text":"Who can stop it? (Who holds the eraser?)"},{"start":187.02,"text":"Bring the choice back to the floor"},{"start":188.66,"text":"No promise we can solve tomorrow"},{"start":190.9,"text":"Or keep pace with every mind"},{"start":192.44,"text":"But we can count the time to notice"},{"start":194.6,"text":"And the cost of changing lines"},{"start":202.6,"text":"Back to the drawing board!"},{"start":205.4,"text":"Draw another line"},{"start":207.07,"text":"Trust is giving room to move"},{"start":208.99,"text":"And room to change our minds"},{"start":210.43,"text":"Back to the drawing board!"},{"start":212.35,"text":"Call the whole room in"},{"start":214.23,"text":"How soon do we know we're drifting?"},{"start":217.98,"text":"Who can change what happens next?"},{"start":221.28,"text":"Who holds the eraser?"},{"start":225.52,"text":"You said yes"},{"start":229.34,"text":"I said yes"},{"start":232.19,"text":"Now we know what to ask"},{"start":236.17,"text":"Round and round, not where we began"},{"start":240.02,"text":"We can trust and change the plan"}];
const END_T=249.8;
const VISUALS = [
'Two yeses; a speaker and a chalk agreement','Second yes; another speaker with different agency','Globe with SALE: English discount versus Italian salt; one spelling, different meanings',
'Racing for the finish','A roundtable of affected people','A shared mission stamped twice','A scale weighs unlike priorities',
'A reported statement passes between faces','One road revealed through the others eyes','Language shared; meanings part','Choice tree with two unselected routes',
'Crack in a written note','Values cannot be decided by wording','A mark drawn while still loose','Wet ink dries under sunlight',
'A chalkboard with a human eraser','A new landscape line inked in','Trust as hands exchanging a key','Different possible paths remain available',
'The board becomes a flower, not old plan','A whole room gathers to deliberate','Two compasses drift apart','A wheel and a key confer authority',
'A human hand holds the eraser','A rotated ornamental return','New chalk lines begin again','Compasses with different bearings',
'Bridge connects separate roads','A question stays open in a book','Two clocks proceed out of phase','Anyone may read the sign',
'An envelope has an intended recipient','Read-write-erase physical tools','A door can be reopened','Sunrise over the city',
'Moving the goalpost when the world changes','A warning beacon cannot compel action','Steering wheel separated from vessel',
'A different illustration replaces old plan','A new line crosses the slate','A key transfers autonomy','A plant branches into future choices',
'Eraser makes a place for a new sun','The forum is invited and heard','A clock notices compass drift',
'A ship gets a working steering connection','An eraser requires legitimate access',
'Two robots check sent mail','Still open? a false interpretation','The overlooked reply in the cabinet','The morning meeting goes ahead',
'A guess passes between messengers','A dependency chain grows','Check the actual record','A dependent chain collapses under revision',
'A factory accelerates decisions','The record cannot be read fast enough','Hands outpace the mechanism','A microphone is unheard before the clock runs out',
'The captain is named','The wheel is remote from the ship','The direction cannot be changed','Nominal authority without control',
'Read access and the intended addressee','Writing a new mark on the contract','A locked eraser held by a person','The forum reopens the question',
'An unmade future without a promise','A car races a superhuman clock','A timer counts detection latency','Revision has measurable cost',
'The returned board supports a different plant','A continuous new stroke','Hands connect through a trusted key','Distinct plants coexist without unison',
'The board grows into a city','The forum returns around the table','Notice divergence through lens','Actual steering reconnects to ship',
'Human can erase, revise and authorize','One speaker says yes again','The other agrees on different terms',
'Now both can ask who and why','Return with a changed orientation','A shared world with different contributions'
];
if(VISUALS.length!==LINES.length)throw Error('All karaoke lines require independently specified visual stories');
function drawNativeResidue(t,i){
 // The Chalked dependency model remains the source of agent marks in the R0 repo.
 // When R0 is loaded, these glowing chalk traces are literally derived from its
 // current mark data; the fallback standalone still draws independent illustrations.
 if(i<51||i>54||typeof marks==='undefined'||!Array.isArray(marks))return;
 g.save();g.globalAlpha=.72;
 for(const m of marks){if(!m.isAgent||!m.pts?.length)continue;
  const pts=m.pts.map(a=>[245+a[0]*.65,203+a[1]*.67]);
  trace(pts,m.color||C.violet,3,.70);
 }
 g.restore();
}
function render(t){
 t=q(t,0,END_T);
 if(typeof nativeScore==='function')nativeScore(t);
 else if(typeof chalkedRelay==='function')chalkedRelay(t);
 board(t);
 let i=-1;for(let j=0;j<LINES.length;j++){if(LINES[j].start<=t)i=j;else break;}
 if(i<0){sproutLogo(650,361,.95,t);hand(992,355,.68,-.30,C.cyan);text('BACK TO THE DRAWING BOARD',648,523,44,C.cream);}
 else{
   const a=LINES[i].start,b=i+1<LINES.length?LINES[i+1].start:END_T;
   const p=q((t-a)/(b-a));
   g.save();g.globalAlpha=ease(Math.min(1,(t-a)/.18));scene(i,p,t,b-a);drawNativeResidue(t,i);g.restore();
   fillRect(58,619,1164,49,C.ink,.95);
   const lyric=LINES[i].text;const size=lyric.length>42?25:lyric.length>31?28:31;
   text(lyric,640,643,size,C.light);
   const mx=g.measureText(lyric).width;
   line(640-Math.min(460,mx*.45),672,640-Math.min(460,mx*.45)+2*Math.min(460,mx*.45)*p,672,P[i%P.length],4,.96);
   text(String(i+1).padStart(2,'0')+' / '+LINES.length,1179,101,18,C.cream,'right',.57);
 }
 line(64,691,1218,691,C.cream,2,.26);line(64,691,64+1154*t/END_T,691,C.cyan,5,.94);
 const hero=document.getElementById('chalked-hero');
 if(hero)hero.style.opacity=String(t<3?.53*(1-ease(t/3)):t>246?.50*ease((t-246)/3.8):0);
 return t;
}
window.renderAt=render;
window.CHALKED_LINE_SCENES=LINES.map((l,i)=>({index:i,start:l.start,end:i+1<LINES.length?LINES[i+1].start:END_T,lyric:l.text,visual:VISUALS[i]}));
window.chalkedArtVersion='V5 85 lyric-directed sketches, expanded bespoke symbolic storyboard';
render(0);
})();