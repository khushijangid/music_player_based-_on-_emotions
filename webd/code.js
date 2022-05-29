var songrun=false;
var count=1;
var mod=1;
var path=
["songs\\believer.mp3"
,"songs\\feelgood.mp3"
,"songs\\aito.mp3"
,"songs\\abcdefu.mp3"
,"songs\\Watermelon Sugar.mp3"
,"songs\\perfect.mp3"
,"songs\\mmos.mp3"
,"songs\\coldmess.mp3"
,"songs\\heather.mp3"
,"songs\\Riha.mp3"
,"songs\\sya.mp3"
,"songs\\i love you so.mp3"
,"songs\\till forever falls apart.mp3" 
,"songs\\apocalypse.mp3"
,"songs\\coffee.mp3"
,"songs\\fixyou.mp3"
,"songs\\kasoor.mp3"
,"songs\\sm.mp3"

];

var sname=
["Believer",
"Feel Good",
"Astronaut In The Ocean",
"abcdefu",
"Watermelon Sugar",
"Perfect",
"Meet Me At Our Spot",
"Cold/Mess",
"Heather",
"Riha",
"See You Again",
"I Love You So",
"Till Forever Falls Apart",
"Apocalypse",
"Coffee",
"Fix You",
"Kasoor",
"There's Nothing Holdin' Me Back"
];

var sd=
["Artist: Imagine Dragons<br>Single<br>Released: 2017",
"Artist: Fresco Trey<br>Featured artist: Lil Tjay<br>Released: 2021"
,"Artist: Masked Wolf<br>Album: Astronaut In The Ocean<br>Released: 2019"
,"Artists: Gayle<br>Album: abcdefu<br>Released: 2022"
,"Artist: Harry Styles<br>Album: Fine Line<br>Released: 2019"
,"Artist: Ed Sheeran<br>Album: Divide<br>Released: 2017"
,"Artists: Tyler Cole, THE ANXIETY, Willow<br>Released: 2020"
,"Artist: Prateek Kuhad<br>Album: Cold/ Mess<br>Released: 2018"
,"Artist: Conan Gray<br>Album: Kid Krow<br>Released: 2020"
,"Artist: Anuv Jain<br>Album: Riha<br>Released: 2019"
,"Artists: Wiz Khalifa, Charlie Puth<br>Movie: Fast and Furious 7<br>Released: 2015"
,"Artist: The Walters<br>Album: Songs for Dads<br>Released: 2014"
,"Artist: Ashe, FINNEAS<br>Album: Ashlyn<br>Released: 2021"
,"Artist: Cigarettes After Sex<br>Released: 2017"
,"Artist: Beabadoobee <br>Released: 2017"
,"Artist: Coldplay<br>Album: X&Y<br>Released: 2005"
,"Artist: Prateek Kuhad<br>Album: Shehron Ke Raaz<br>Released: 2021"
,"Artist: Shawn Mendes<br>Released: 2017"
];

var bool=[];
for(var i=0; i<sd.length; i++)
	bool[i]=false;

var icon=["images\\\\1.jpg",
"images\\\\2.jpg",
"images\\\\3.jpg",
"images\\\\4.jpg",
"images\\\\5.jpg",
"images\\\\6.jpg",
"images\\\\7.jpg",
"images\\\\8.jpg",
"images\\\\9.jpg",
"images\\\\10.jpg",
"images\\\\11.jpg",
"images\\\\12.jpg",
"images\\\\13.jpg",
"images\\\\14.jpg",
"images\\\\15.jpg",
"images\\\\16.jpg",
"images\\\\17.jpg",
"images\\\\18.jpg"
];

var mood=[["1","2","3","4"],["5","6", "7"],["8","9","10","11"],["12","13","14","15","16","17","18"]];
var mmm=["1.png","1.png","1.png","1.png","2.png","2.png","2.png","3.png","3.png","3.png","3.png","4.png","4.png","4.png","4.png","4.png","4.png","4.png"];

var songs=new Array(icon.length);
for (var i = 0; i<icon.length; i++) {
	songs[i]=new Array(4);
	songs[i][0]=path[i];
	songs[i][1]=sd[i];
	songs[i][2]=icon[i];
	songs[i][3]=mmm[i];
	console.log(songs[i][0]);
	console.log(songs[i][1]);
	console.log(songs[i][2]);
	var ins=document.createElement("div");
	ins.id='b'+i;
	
	ins.setAttribute("class", "song");
	document.body.appendChild(ins);
	document.getElementById('b'+i).innerHTML='<div id="pic" style=\'background-image: url(\"'+songs[i][2]+'\");\'>  <input type="button" id="'+"a"+i+'" class="play" > <input type="button" id="'+"c"+i+'" class="add">  </div><div id="data"><br><br>'+songs[i][1]+'</div>';
	document.getElementById('a'+i).onclick=function(){
		play(this);
	};
	document.getElementById('c'+i).onclick=function(){
		addq(this);
	};	
}




function setmod(elem){
	mod=elem.value;
	if(!songrun){
		if(mod==2)
			getTime();
		if(mod==3)
			rand_play();
	}
}

function play(elem){
	console.log(elem.id);
	var x=elem.id.charAt(1);
	var z=songs[x][0];
	document.getElementById("sname").innerHTML=sname[x];
	document.getElementById("sel").src= z;
	document.getElementById("main_slider").load();
	document.getElementById("main_slider").play();
	document.getElementById("emoji").style.backgroundImage="url('"+songs[x][3]+"')";
	songrun=true;

}

var eqc=1;
var sqc=1;

function addq(elem){
	console.log(elem.id);
	var x=elem.id.charAt(1);
	if(!songrun){
		var z=songs[x][0];
		document.getElementById("sname").innerHTML=sname[x];
		document.getElementById("sel").src= z;
		document.getElementById("main_slider").load();
		document.getElementById("main_slider").play();
		document.getElementById("emoji").style.backgroundImage="url('"+songs[x][3]+"')";
		songrun=true;		
		return;
	}
	if(bool[x]==true)
		return;
	
	bool[x]=true;
	var l=document.createElement("label");
	l.id="e"+eqc;
	l.name=x;
	l.innerHTML=sname[x]+"<br>";
	//var text=document.createTextNode(sname[x]+"<br>");
	//l.appendChild(text);
	document.getElementById("queue").appendChild(l);
	eqc=eqc+1;
}

function nextsong(){
	if(sqc==eqc){
				alert("Queue is empty.");
				return;
		}
		var elem=document.getElementById("e"+sqc);
			var xa=elem.name;
			var pa=songs[xa][0];
			bool[xa]=false;
			document.getElementById("sname").innerHTML=sname[xa];
			document.getElementById("sel").src= pa;
			document.getElementById("main_slider").load();
			document.getElementById("main_slider").play();
			document.getElementById("emoji").style.backgroundImage="url('"+songs[xa][3]+"')";
			
			songrun=true;
			document.getElementById("queue").removeChild(elem);	
			sqc=sqc+1;

}

function next_in_Q(){
			songrun=false;
			if(sqc==eqc){
				alert("Queue is empty.");
				return;
			}
			var elem=document.getElementById("e"+sqc);
			var xa=elem.name;
			var pa=songs[xa][0];
			document.getElementById("sname").innerHTML=sname[xa];
			document.getElementById("sel").src= pa;
			document.getElementById("main_slider").load();
			document.getElementById("main_slider").play();
			document.getElementById("emoji").style.backgroundImage="url('"+songs[xa][3]+"')";
			songrun=true;
			document.getElementById("queue").removeChild(elem);	
			sqc=sqc+1;
			}

function rand_play(){
	var index=Math.random()*path.length;
	index=parseInt(index);
	var pa=songs[index][0];
	document.getElementById("sname").innerHTML=sname[index];
	document.getElementById("sel").src= pa;
	document.getElementById("main_slider").load();
	document.getElementById("main_slider").play();
	document.getElementById("emoji").style.backgroundImage="url('"+songs[index][3]+"')";
	songrun=true;

}
function moody(val){
	var index=Math.random()*mood[val].length;
	index=parseInt(index);
	var pa=songs[mood[val][index]-1][0];
	document.getElementById("sname").innerHTML=sname[mood[val][index]-1];
	document.getElementById("sel").src= pa;
	document.getElementById("main_slider").load();
	document.getElementById("main_slider").play();
	document.getElementById("emoji").style.backgroundImage="url('"+songs[mood[val][index]-1][3]+"')";
	songrun=true;
}

async function getTime() {
                let value = await eel.getEmotion()();
                if(value=="angry")
                	moody(0);
                else if(value=="happy")
                	moody(1);
                else if(value=="sad")
                	moody(2);
                else
                	moody(3);
            }