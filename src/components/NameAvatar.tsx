import {memo} from "react";

export const NameAvatar=memo(({name}:{name:string})=>{
	const nameApart=name.split(' ');
	const colors1 = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
	const colors2 = ["#1abc9c", "#3498db",  "#d35400","#c0392b","#f1c40f"];
	const rand1=Math.floor((Math.random()*10))%5;
	const nameInitials=(nameApart[0][0]||"")+(nameApart.length>1?(nameApart[1][0]).toUpperCase():"");
	return <div style={{backgroundColor:`${colors1[rand1]}`,color:"white",borderRadius:"50%",fontSize:"0.7em",display:"flex",alignItems:"center",padding:"1px 3px",position:"relative",width:"20px",height:"20px",justifyContent:"center"}}>
		<div style={{backgroundColor:`${colors2[rand1]}`, width:"9px", height:"9px",borderRadius:"50%",position:"absolute",left:"13px",top:"13px",border:"2px solid white"}}></div>
		{nameInitials}
	</div>
})