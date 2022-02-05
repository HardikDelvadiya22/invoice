import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";

export default function Invoice() {
    const router=useRouter()
	return (
		<div>
			<Header />
            <div className="mt-3 px-5 ">
                <button className="btn btn-outline-primary"
                onClick={(e)=>{router.push("/invoice/create-invoice")}}
                >+ Create Invoice</button>
            </div>
		</div>
	);
}
