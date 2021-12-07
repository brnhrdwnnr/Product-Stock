import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [data, setData] = useState([]);

	const getData = () => {
		fetch("data.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				setData(result);
			});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="col-md-12">
			<div class="row">
				<table className="table">
					<thead>
						<tr className="bg-secondary text-center">
							<th scope="col">Jakarta - Kedoya</th>
							<th scope="col">Tangerang - Dadap</th>
							<th scope="col">Bekasi - Galaxy</th>
							<th scope="col">Category</th>
							<th scope="col">Product</th>
							<th scope="col">Total Stock</th>
							<th scope="col">Percent</th>
							<th scope="col">Total Order</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{data?.proformaItem?.map((item) => (
							<tr key={item.product_id}>
								<td>{JSON.parse(item.product_stock).map((el) => el[1])}</td>
								<td>{JSON.parse(item.product_stock).map((el) => el[3])}</td>
								<td>{JSON.parse(item.product_stock).map((el) => el[5])}</td>
								<td>{item.categoryDescription}</td>
								<td>{item.productDescription}</td>
								<td>
									{JSON.parse(item.product_stock)
										.map((el) => Object.values(el)[0])
										.reduce((a, b) => a + b, 0)}
								</td>
								<td>
									{Number(
										(JSON.parse(item.items)
											.map((el) => el.qty)
											.reduce((a, b) => a + b, 0) /
											JSON.parse(item.product_stock)
												.map((el) => Object.values(el)[0])
												.reduce((a, b) => a + b, 0)) *
											100
									).toFixed(2)}
									%
								</td>
								<td>
									{JSON.parse(item.items)
										.map((el) => el.qty)
										.reduce((a, b) => a + b, 0)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
