import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function CreateInvoice() {
	const [inputFields, setInputFields] = useState([{ quentity: "", price: "", product: "" }]);
	const [customers, setCustomers] = useState([]);
	const [products, setProducts] = useState([]);
	const [currentProductPrice, setCurrentProductPrice] = useState();
	const router = useRouter();
	console.log(inputFields, "inputFields........")
	const handleAddFields = () => {
		const values = [...inputFields];
		values.push({ quentity: "", price: "", product: "" });
		setInputFields(values);
	};

	useEffect(() => {
		getAllCustomers();
		getAllProducts();
	}, []);

	const getAllCustomers = () => {
		axios.get(`${process.env.baseUrl}/customers`)
			.then(function (response) {
				setCustomers(response.data)
			}).catch(function (err) {
				console.log(err, "....errr.....")
			})
	}
	const getAllProducts = () => {
		axios.get(`${process.env.baseUrl}/products`)
			.then(function (response) {
				setProducts(response.data)
			}).catch(function (err) {
				console.log(err, "....errr.....")
			})
	}



	const handleRemoveFields = (index) => {
		const values = [...inputFields];
		values.splice(index, 1);
		setInputFields(values);
	};

	const handleInputChange = (index, event) => {
		const values = [...inputFields];
		if (event.target.name === "quantity") {
			values[index].quantity = event.target.value;
			values[index].price = (Number(event.target.value) * Number(currentProductPrice));
		} else if (event.target.name === "price") {
			// values[index].price = (10 * values[index].price);
		} else {
			values[index].product = event.target.value;
			products.map((ele) => {
				if (ele.id == event.target.value) {
					console.log(ele, ".......ele....")
					values[index].price = ele.price;
					setCurrentProductPrice(ele.price)
				}
			})



		}

		setInputFields(values);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("inputFields", inputFields);
	};

	return (
		<>
			<Header />
			<div className="mt-3 px-5 ">
				<button
					className="btn btn-outline-secondary"
					onClick={() => {
						router.push("/invoice");
					}}>
					Back to list
				</button>
				<div className="form-group col-sm-2">
					<button className="btn btn-outline-danger" type="button" onClick={(index) => handleRemoveFields(index)}>
						-Remove Product
					</button>
					<button className="btn btn-outline-primary" type="button" onClick={() => handleAddFields()}>
						+Add Product
					</button>
				</div>
				<div className="card mt-3">
					<div className="card-body">
						<h5 className="card-title">Invoice</h5>
						<select className="form-select mt-4" aria-label="Default select example">
							<option selected>Select Customer</option>
							{customers?.map((ele) => {
								return (
									<option key={ele.id} value={ele.id}>{ele.name}</option>
								)
							})}
						</select>
						<form className="mt-5" onSubmit={handleSubmit}>
							<div className="form-row">
								{inputFields.map((inputField, index) => (
									<div key={`${inputField}~${index}`}>
										<div className="form-group col-sm-6">
											<select className="form-select mt-4"
												onChange={(event) => handleInputChange(index, event)}
												name="product"
												aria-label="Default select example">
												<option selected>Select Product</option>
												{products?.map((ele) => {
													return (
														<option key={ele.id} value={ele.id}>{ele.name}</option>
													)
												})

												}
											</select>
											<label htmlFor="quantity">Quantity</label>
											<input
												min={1}
												defaultValue={1}
												type="number"
												className="form-control"
												id="quantity"
												name="quantity"
												value={inputField.quantity}
												onChange={(event) => handleInputChange(index, event)}
											/>
										</div>
										<div className="form-group col-sm-4">
											<label htmlFor="price">Price</label>
											<input
												disabled
												type="text"
												className="form-control"
												id="price"
												name="price"
												value={inputField.price}
												onChange={(event) => handleInputChange(index, event)}
											/>
										</div>

									</div>
								))}
							</div>
							<div className="submit-button">
								<button className="btn btn-primary mr-2" type="submit" onSubmit={handleSubmit}>
									Save
								</button>
							</div>
							<br />
							{/* <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
						</form>
					</div>
				</div>
				<div className="card mt-3 p-3"><h1>hello</h1></div>
			</div>
		</>
	);
}
