
import Ordercard from "@/components/ordercard";


export default function Orders(){
    return <div className=" flex justify-center items-start w-full min-h-screen ">
     <div className="grid grid-cols-3 gap-5">
        <Ordercard></Ordercard>
        <Ordercard></Ordercard>
        <Ordercard></Ordercard>
        <Ordercard></Ordercard>
        <Ordercard></Ordercard>
        <Ordercard></Ordercard>
        <Ordercard></Ordercard>
    </div>
    </div>

}