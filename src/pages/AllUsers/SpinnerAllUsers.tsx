import SpinnerPresentationCard from "../../components/PresentationCard/SpinnerPresentationCard"

export default function SpinnerAllUsers() {
    const arr =[null,null,null,null,null,null,null,null,]
    
  return (
    <>
      {arr.map((e,i)=> <SpinnerPresentationCard key={i}/>)}
    </>
  )
}