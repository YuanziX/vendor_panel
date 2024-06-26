"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Fade } from "react-awesome-reveal";
import {  toast } from 'sonner';
import { updateOrder } from "@/components/actions/updateorder";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
export default function Ordercard(props: any) {
  const [color,setColor]= useState("")
  const [bgColor,setBgColor]=useState("")
  useEffect(()=>{
    if(props.orderstatus=="Cooking"){
      setColor('text-red-900')
      setBgColor('bg-red-100')
      console.log(color)
    }
    if(props.orderstatus=="Ready"){
      setColor('text-yellow-900')
      setBgColor('bg-yellow-100')
      console.log(color)
    }
    if(props.orderstatus=="Delivered"){
      setColor('text-green-900')
      setBgColor('bg-green-100')
      console.log(color)
    }
  },[props.orderstatus])
  const [value,setValue]= useState("")
  const queryClient = useQueryClient()
  const MutateUpdateOrder = useMutation({
    mutationFn:()=>  updateOrder(value, props.orderid),
    onSettled:()=>{
      queryClient.invalidateQueries({queryKey:["order"]})
      queryClient.invalidateQueries({queryKey:["feworders"]})
      toast.success("Update Succesful")
    },
    onError:()=>{
      toast.error("Could not update")
    }
  })
  return (
    <Fade>
      <div className="min-h-72 w-80 rounded-lg shadow-sm border-2 border-gray-200 dark:shadow-gray-700 flex justify-around items-center bg-white hover:shadow-lg duration-150 dark:bg-zinc-900 dark:border-gray-600">
        <div className="h-full w-full py-2">
          <div className="h-20 w-full flex justify-around items-start pl-2 border-b-2 border-gray-200 border-dashed dark:border-gray-600">
            <div className="h-full w-1/2 flex items-center justify-around flex-col">
              <div className="font-semibold">Order No: {props.orderid}</div>
              <div className="font-semibold ">Rs. {props.price}</div>
            </div>
            <div className={`w-1/2 h-full  font-semibold flex justify-around items-center flex-col`}>
              <div>Order Status:</div>
              <div className={`${color} ${bgColor} rounded-lg px-2`}>
              {props.orderstatus}
              </div>
              
            </div>
          </div>
          <div className="w-full min-h-36 flex flex-col justify-around items-center">
            {props.orderproduct.map((orderproduct:any,index:number)=>{
              return <div key={index} className="flex  w-full justify-between  px-10 items-center ">
                <div>
                {orderproduct.product.name}
                </div>
                <div>
                {orderproduct.quantity}
                </div>
              </div>
            })}
          </div>
          <div className="flex justify-around items-center h-16 pl-2 font-bold border-t-2 border-gray-200 border-dashed dark:border-gray-600">
            <Button disabled={MutateUpdateOrder.isPending} variant={"delivered"} onClick={() => 
              {
                setValue("Delivered")
                MutateUpdateOrder.mutate()
              }
              }>
              Delivered
            </Button>
            <Button disabled={MutateUpdateOrder.isPending} variant={"ready"} onClick={() =>{ 
              setValue("Ready")
              MutateUpdateOrder.mutate()}}>
              Ready
            </Button>
            <Button disabled={MutateUpdateOrder.isPending} variant={"outline"}onClick={()=>{
              setValue("Cooking")
              MutateUpdateOrder.mutate()
            }}>Cooking</Button>
          </div>
        </div>
      </div>
    </Fade>
  );
}
