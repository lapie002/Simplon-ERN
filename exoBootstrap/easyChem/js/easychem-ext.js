/*
 easyChem. v0.6.27β 2015-05-08 by PeterWin
*/
var ChemSysExt=new function(){this.makeSVG=function(c,h){h=h||ChemSys.rulesHtml;function q(i){return Math.round(i*100)/100}var b=0,p={},e,o,n,m;try{b=document.createElement("div");b.className="echem-formula";document.body.appendChild(b);e=ChemSys.graphProps(b);for(o in e.fonts){n=e.fonts[o];p[o]=m={fnt:"font-size:"+n.size+"px; font-family:"+n.family+"; ",h:n.size,cnt:0};if(n.bold){m.fnt+="font-weight:bold; "}if(n.italic){m.fnt+="font-style:italic; "}m.fnt+="fill:"+n.color+"; "}}finally{if(b){document.body.removeChild(b)}}var j=e.lineLen.dash,r=ChemSys.buildFrame(c,{lineLen:e.lineLen,setTextProps:function(v){var z=p[v.fntId],A=0,y=document.createElement("div");z.cnt++;if(y){y.className="echem-formula";document.body.appendChild(y);y.innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"><text style="'+z.fnt+'">'+htmlEscape(v.text)+"</text></svg>";var x=y.firstChild;if(x){var B=x.firstChild;if(B){var i=B.getComputedTextLength();var C=B.getNumberOfChars();A=new Point(i,z.h)}}document.body.removeChild(y)}A=A||new Point(z.h*0.6,z.h);v.sz=A}});var l=r.sz.x+10,s=r.sz.y+10,d=e.color,t='<svg  xmlns="http://www.w3.org/2000/svg" width="'+q(l)+'" height="'+q(s)+'">\n  <defs>\n    <style type="text/css">\n    <![CDATA[\ntext { dominant-baseline:text-after-edge; }\n',u="    ]]></style>\n  </defs>\n";var k=0;function f(C,E,B){var A,z,v,K,w,H,D=E.subx(C.org).addx(C.pos);for(A in C.frms){f(C.frms[A],D,B)}for(A in C.prims){v=C.prims[A];if(v.type=="text"&&B){w=D.addx(v.pos);var F=w.y+p[v.fntId].h;u+='<text x="'+q(w.x)+'" y="'+q(F)+'" class="fnt-'+v.fntId+'"';if(v.color){u+=' style="fill:'+v.color+'"'}u+=">"+htmlEscape(v.text)+"</text>\n"}else{if(v.type=="lines"&&!B){u+='<path d="';for(z=0;z<v.pts.length;z++){K=v.pts[z];w=D.addx(K);if(z){u+=" "}u+=K.mv?"M":"L";u+=" "+q(w.x)+" "+q(w.y)}u+=' z"';var x=v.color||d,J=0,G=0,I=0;if(v.bFill){I=J=x}if(v.w!=1){G=v.w;I=x}if(v.color){I=x}if(J||G||I){if(J){u+=' fill="'+J+'"'}if(G){u+=' stroke-width="'+Math.round(v.w)+'"'}if(I){u+=' stroke="'+I+'"'}}else{u+=' class="line-std"';if(!k){t+=".line-std {stroke:"+(v.color||d)+"}\n";k=1}}if(v.style==":"){u+=' style="stroke-dasharray: '+j+","+(j*2)+'"'}u+=" />\n"}else{if(v.type=="circle"&&!B){w=D.addx(v.c);u+='<circle cx="'+q(w.x)+'" cy="'+q(w.y)+'" r="'+q(v.r)+'"';u+=' fill="none"';u+=' style="stroke:'+(v.color||d)+'"';u+=" />\n"}}}}}var g=new Point();f(r,g,0);f(r,g,1);u+="</svg>";for(o in p){if(p[o].cnt){t+="    .fnt-"+o+"{"+p[o].fnt+"}\n"}}return t+u}};var ChemEqDict={ru:{"[E] is missing in [S] part":"Отсутствует элемент [E] в [S] части уравнения.","left|part":"левой","right|part":"правой","Equation not specified":"Уравнение не задано","No separating operation":"Требуется одна операция, разделяющая левую и правую часть уравнения.","No solution":"Не удалось найти решение","Cant balance expression with abstract koefficients":"Невозможно балансировать уравнение с абстрактными коэффициентами"},en:{"[E] is missing in [S] part":"Element [E] is missing on the [S] side of the equation.","left|part":"left","right|part":"right","Equation not specified":"The equation is not specified","No separating operation":"Requires a single operation, separating the left and right side of the equation.","No solution":"Could not find a solution."}};function ChemEquation(d){if(ChemEqDict){ChemSys.addDict(ChemEqDict);ChemEqDict=null}function n(H,I){this.x=H||0;this.y=I||1}n.prototype={toString:function(){if(this.y==1){return this.x+""}return this.x+"/"+this.y},copy:function(){return new n(this.x,this.y)},set:function(H){this.x=H;this.y=1},isEmpty:function(){return this.x==0},aless:function(H){return Math.abs(this.x)*H.y<Math.abs(H.x)*this.y},sign:function(){if(this.x<0){return -1}if(this.x>0){return 1}return 0},negx:function(){return new n(-this.x,this.y)},absx:function(){return new n(Math.abs(this.x),this.y)},addi:function(H){if(s(H)){this.x+=H*this.y}else{if(this.y==H.y){this.x+=H.x}else{this.x=this.x*H.y+H.x*this.y;this.y*=H.y;this.norm()}}return this},addx:function(H){if(s(H)){return new n(this.x+H*this.y,this.y)}else{return this.copy().addi(H)}},subi:function(H){return this.addi(H.negx())},subx:function(H){return H.negx().addi(this)},muli:function(H){if(s(H)){this.x*=H}else{this.x*=a.x;this.y*=a.y;this.norm()}return this},mulx:function(H){if(s(H)){return new n(this.x*H,this.y)}else{var I=new n(this.x*H.x,this.y*H.y);return I.norm()}},divi:function(H){this.x*=H.y;this.y*=H.x;return this.norm()},divx:function(H){var I=new n(this.x*a.y,this.y*a.x);return I.norm()},norm:function(){if(this.y<0){this.x=-this.x;this.y=-this.y}if(this.x==0){this.y=1}else{if(this.x<1||this.x>1){var H=B(this.x,this.y);this.x/=H;this.y/=H}}return this}};function s(H){return typeof H=="number"}function B(J,I){var H=Math.min(Math.abs(J),Math.abs(I));while(H>1){if(J%H==0&&I%H==0){break}H--}return H}var D=0,r=1,z=2,m,f,i,o,u=0,t=0,g=[],e=[],G=[],x=[];function w(H,I,J){m=H;i=I;o=J||0}function v(){w(D,"Not solved");g=[];f=null;G=[];x=[]}this.init=function(H){v();var N=typeof H,V="Invalid expression";if(!H){return w(r,V)}if(N=="string"){f=ChemSys.compile(H)}else{if(N=="object"&&H.isOk){f=H}}if(!f||!f.isOk()){return w(r,V)}var M=0,J=0;f.walk({itemPre:function(ab){var aa=+ab.n;M=M||isNaN(aa);if(aa){J=J||Math.floor(aa)!=aa}}});if(M){return w(r,"Cant balance expression with abstract koefficients")}if(J){return w(r,"Cant balance expression with non-integer koefficients")}var T,S,L,X,Y={},P=[];f.walk({agentPre:function(ab){g.push(ab);var ac=ab.part;while(P.length<ac+1){P[ac]={}}var aa=ChemSys.groupElements(ab);ChemSys.merge(Y,aa,1);ChemSys.merge(P[ac],aa,1)}});u=g.length;if(P.length!=2){return w(r,"No separating operation")}for(S=0;S!=2;S++){L=P[S];X=P[S^1];for(T in L){if(!X[T]){var Q=ChemSys.lang((S==0?"right":"left")+"|part");return w(r,"[E] is missing in [S] part",{E:T,S:Q})}}}var O={},Z,R;S=0;for(Z in Y){O[Z]=S++}t=S;var K=[];for(S=0;S!=t;S++){G.push([])}for(S=0;S!=u;S++){for(T=0;T!=t;T++){K[T]=new n()}var I=g[S],U=ChemSys.groupElements(I);for(T in U){R=O[T];var W=U[T];if(I.part==1){W=-W}K[R].set(W)}for(T in G){G[T].push(K[T])}}for(S=0;S!=u;S++){e[S]=new n()}};this.solve=function(){while(m==D){this.calcStep()}};this.calcStep=function(){if(m!=D){return}var H,I,K,J;if(x.length==u-1){return k()}for(H in G){K=[];J=G[H];for(I=0;I!=u;I++){if(!J[I].isEmpty()){K.push(I)}}if(K.length==2&&J[K[0]].sign()!=J[K[1]].sign()){return q(H,K[0],K[1])}if(K.length==0){G.splice(H,1);return}}if(p()){return}if(l()){return}w(r,"Balance is not found")};this.isOk=function(){return m==z};this.getMessage=function(){return ChemSys.lang(i,o)};this.getExpr=function(){return f};function E(I,H){this.srcCol=I;this.k=H}function A(H){this.dstCol=H;this.refs=[]}function p(){if(G.length<2){return false}var L,O,N=0,M=0,K,T,R,Q,P=G.length,H;for(;;++M){K=M;++K;if(K==P){return 0}R=G[M];for(;K!=P;++K){Q=G[K];for(N=0;N!=u;N++){if(!R[N].isEmpty()&&!Q[N].isEmpty()){break}}if(N!=u){break}}if(K!=P){break}}R=G[M];Q=G[K];var J=new n(-1).divi(R[N]),I=new n(-1).divi(Q[N]),S=new A(N);for(O=0;O!=u;O++){if(O==N||R[O].isEmpty()){continue}S.refs.push(new E(O,R[O].mulx(J)))}if(S.refs.length==0){return 0}x.unshift(S);for(O=0;O!=u;O++){Q[O]=R[O].mulx(J).subi(Q[O].mulx(I))}G.splice(M,1);K--;P--;for(M=0;M!=P;++M){if(M==K){continue}T=G[M];L=T[N].copy();T[N].set(0);for(O in S.refs){H=S.refs[O];T[H.srcCol].addi(L.mulx(H.k))}}return 1}function j(){var I,H,K=[],J=[];for(I=0;I!=u;I++){K[I]=0}for(I in x){H=x[I];K[H.dstCol]=1}for(I=0;I!=u;I++){if(!K[I]){J.push(I)}}return J}function y(K,I){var J,H=K.length;for(J=0;J!=H;J++){e[K[J]].set(I[J])}c();if(!b()){return 0}C();if(!F()){return false}h();return 1}function l(){var I,O=j(),P=O.length,V=50,R=[];for(I=0;I!=P;I++){R[I]=1}if(y(O,R)){return 1}var H=[],K=[],Q=1<<P,S,J,W,U,T;for(S=2;S<=V;S++){for(W=1;W!=Q;W++){K=[];for(I=0,U=1;U!=Q;U<<=1,I++){if((W&U)==0){K.push(I)}else{R[I]=S}}T=K.length;for(I=0;I!=T;I++){H[I]=1}do{J=0;for(I=0;I!=T;I++){R[K[I]]=H[I]}if(y(O,R)){return 1}while(J!=T){if(++H[J]>=S){H[J++]=1}else{break}}}while(J!=T)}}return 0}function k(){var H,I;for(H=0;H!=u;H++){e[H].set(0)}I=j();for(H in I){e[I[H]].set(1)}c();C();if(!b()||!F()){w(r,"Balance is not found")}else{h()}}function c(){var J,K,I,H,L;for(K in x){I=x[K];H=I.dstCol;e[H].set(0);for(J in I.refs){L=I.refs[J];e[H].addi(L.k.mulx(e[L.srcCol]))}}}function C(){var M=0,O=1,L,P,K,J=[],I=0,H,N=2;for(;M<u;M++){L=e[M].y;P=B(O,L);K=O*L/P;O=Math.max(O,K)}for(M=0;M!=u;M++){H=e[M];K=O/H.y;J[M]=H.x*K;I=Math.max(I,J[M])}while(N<=I){M=0;while(M!=u&&(J[M]%N==0)){M++}if(M!=u){N++;continue}I/=N;for(M=0;M!=u;M++){J[M]/=N}}for(M=0;M!=u;M++){e[M].set(J[M])}}function b(){var I,H;for(I=0;I!=u;I++){H=e[I];if(H.x<=0){return 0}}return 1}function F(){var M={},H,I,N,J,L,K;for(H=0;H!=u;H++){J=g[H];L=ChemSys.groupElements(J);for(I in L){K=L[I];if(J.part!=0){K=-K}K*=e[H].x;if(!M[I]){M[I]=K}else{M[I]+=K}}}for(I in M){if(M[I]!=0){return 0}}return 1}function h(){w(z,"Ok");for(var H=0;H!=u;H++){g[H].setKoeff(e[H].x)}}function q(J,I,N){var K,M=G[J],H=M[N].negx().divi(M[I]),L=new A(I);L.refs.push(new E(N,H));x.unshift(L);G.splice(J,1);for(K in G){M=G[K];M[N].addi(M[I].mulx(H));M[I].set(0)}}if(d){this.init(d)}}var ChemElectronCfg=new function(){var c=0;var b="s;s;+s;s;p;p;p;p;p;p;+s;s;p;p;p;p;p;p;+s;s;d;d;d;ddS;s;d;d;d;ddS;s;p;p;p;p;p;p;+s;s;d;d;ddS;d;s;ddS;d;ddS;s;s;p;p;p;p;p;p;+s;s;d;f;ffD;f;f;f;f;d;ffD;f;f;f;f;f;d;d;d;d;d;d;d;ddS;d;s;p;p;p;p;p;p;+s;s;d;d;ffD;f;f;ffD;f;d;ffD;f;f;f;f;f;d;d;d;d;d;d;d;d;ddS;s";function d(){var q,o,s,n,k,e,w,t=1,v=[],g,u,x=b.split(";");c=[];for(q in x){g=[];for(o in v){n=v[o];k={};for(s in n){k[s]=n[s]}g.push(k)}function m(B,f){var i=g.length-1;while(i>=0&&(g[i].Lv!=B||g[i].cfg!=f)){i--}if(i>=0){return g[i]}var A={Lv:B,cfg:f,N:0};if(f=="d"){var j=g.pop();g.push(A,j)}else{if(f=="f"){var z=g.pop(),y=g.pop();g.push(A,y,z)}else{g.push(A)}}return A}function h(i){var f=g.length-1;while(f>=0&&i!=g[f]){f--}if(f>=0){g.splice(f,1)}}u=x[q];e=u.length;var p={S:{n:-1,L:0},D:{n:-1,L:1},s:{n:1,L:0},p:{n:1,L:0},d:{L:1,n:1},f:{L:2,n:1}};for(o=0;o<e;o++){w=u.charAt(o);if(w=="+"){t++;g[g.length-1].prev=c.length-1;continue}var l=p[w],r=w.toLowerCase();if(l){n=m(t-l.L,r);n.N+=l.n;if(!n.N){h(n)}}}c.push(v=g)}}this.getList=function(){if(!c){d()}return c};this.getAtom=function(g){var e,h=+g;if(h){e=h-1}else{var f=ChemSys.findElem(g);if(!f){return f}e=f.n-1}return this.getList()[e]};this.recHtml=function(f,e){if(e&&f.id){return"["+f.id+"]"}return f.Lv+f.cfg+"<sup>"+f.N+"</sup>"};this.cfgHtml=function(e,j,h){h=h||"";var g,f="";for(g in e){if(g!=0){f+=h}f+=this.recHtml(e[g],j)}return f};this.shortInfo=function(f){var e=f.length-1;while(e>=0&&!f[e].prev){e--}if(e<0){return f}var g=f[e];g.id=MenTblArray[g.prev].id;return f.slice(e)};this.elCount=function(e){var h=[],g,f;for(g in e){f=e[g].Lv-1;if(!h[f]){h[f]=0}h[f]+=e[g].N}return h};this.drawCircles=function(q){var n=q.canvas,w=q.ctx,f=q.owner;if(!f){return}if(!n||!w){try{n=document.createElement("CANVAS");if(n&&n.getContext){w=n.getContext("2d")}}catch(B){}q.canvas=n;q.ctx=w;if(!w){f.innerHTML=ChemSys.lang("Browser does not support canvas-graphics");return 0}}else{}var o=this.getAtom(q.elem);var G=this.elCount(o);var m=ChemSys.graphProps(f);var p=m.fonts.Atom,v="";if(p.italic){v+="italic "}if(p.bold){v+="bold "}v+=p.size+"px "+p.family;var A=q.nucleusR||p.size;q.nucleusR=A;var z,y,l,h,F=q.orbit_dR||p.size/2;q.orbit_dR=F;var C=F/3;l=h=A+F*(G.length+1);n.width=l*2;n.height=h*2;var k=G.length;var x=q.angles;if(!x||x.length!=k){x=[];for(z=0;z<k;z++){x[z]=-Math.PI/2}}q.angles=x;for(y=G.length;y>0;y--){var s=A+y*F;w.beginPath();w.arc(l,h,s,0,Math.PI*2,false);w.strokeStyle=m.color;w.lineWidth=1;w.stroke();var g=G[y-1],H=x[y-1],u=Math.PI*2/g;for(z=0;z<g;z++){var D=u*z+H;var t=l+s*Math.cos(D);var E=h+s*Math.sin(D);w.beginPath();w.arc(t,E,C,0,Math.PI*2,false);w.fill()}}w.beginPath();w.arc(l,h,A,0,Math.PI*2,false);w.fillStyle="#DDD";w.fill();w.font=v;w.fillStyle=m.color;w.textBaseline="middle";w.textAlign="center";w.fillText(q.elem,n.width/2,n.height/2);f.appendChild(n)}};