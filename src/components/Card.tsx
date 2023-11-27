import {memo} from "react";
import {PriorityGroupType, StatusGroupType, TicketType, UsersGroupType} from "./App";
import {NameAvatar} from "./NameAvatar";
import {StatusSymbol} from "./StatusSymbol";
import {PrioritySymbol} from "./PrioritySymbol";

export const Card=memo(({card,type}:{type:string,card:(TicketType & UsersGroupType) | (TicketType & StatusGroupType) | (TicketType & PriorityGroupType)})=>{

	return  <div className={"card borderColor"}>
		<div className={"cardId"}>
			<div>{card.id}</div>
			{type!=="User"?<NameAvatar name={card.name}/>:<></>}

		</div>
		<div style={{marginBottom:"5px",display:"flex",width:"100%",gap:"5px"}}>
			{type!=="Status"?  <div style={{position:"relative",top:"2px"}}><StatusSymbol status={(card as (TicketType & UsersGroupType)).status} /></div>:<></>}
			<div>{card.title}</div>
		</div>


		<div style={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
			{type!=="Priority"?<div className={"borderColor"} style={{display: "flex", alignItems: "center",padding:"2px",position:"relative",top:"-1px"}}>
				<PrioritySymbol priority={String((card as (TicketType & StatusGroupType)).priority)}/>
			</div>:<></>}
			{card.tag.map((temptag,index)=>{
				return <div key={index} className={"borderColor"} style={{color:"#a1a4a8",padding:"0px 5px",display:"flex",alignItems:"center",gap:"5px",marginBottom:"2px"}}>
					<div style={{backgroundColor:"#a1a4a8",borderRadius:"50%", width:"10px",height:"10px"}}></div>
					<p style={{fontSize:"0.9em"}}>{temptag}</p>
				</div>
			})}


		</div>

	</div>
})