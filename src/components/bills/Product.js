import { AlternateEmail, DeleteOutline } from "@material-ui/icons";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import FetchContext from "../../context/create-context";

export default function Product({
  products,
  set_ids,
  ids ,
  setProducts,
  total,
  setTotal
}) {
  const fetchContext = useContext(FetchContext);
  const history = useHistory();
  const submitHandler = async (event) => {
    const id = await JSON.parse(localStorage.getItem("login-cred"))._id;
    event.preventDefault();
    console.log(products.length);
    if (products.length === 0) {
      alert("Nothing has been selected");
      return;
    }
    const data = {
      products,
      total: total,
    };
    const responseFromBackend = await fetchContext.post(`/create/${id}`, data);
    console.log(responseFromBackend);
    if (fetchContext.response.ok) {
      //move to order page with passing responseFromBackend stuff
      //update product in main page
       fetchContext.dispatch({type:'reload'}) ;
      const location = {
        pathname: "/order",
        state: responseFromBackend
      };
      history.push(location);
    } else {
      alert("Unable to save order");
    }
  };

  const onChangeHandler = (e, item) => {
    // optimised
    //loop through products and find the maching id of the product and update the select value
    //and also update the total value
    console.log(products);
    products.forEach((prod, index) => {
      if (prod.item._id === item._id) {
        //matched
        const tempArray = [...products];
        const initialSelect = tempArray[index].select;
        const inputQuantity = e.target.value;
        if (item.stock < inputQuantity) {
          alert("Cannot add more ");
          e.target.value = initialSelect;
        } else {
          tempArray[index].select =
            isNaN(inputQuantity) || inputQuantity === ""
              ? 1
              : parseInt(inputQuantity);
          let totalMrp = total;
          let toSubTract =
            initialSelect *
            (item.discounted_mrp ? item.discounted_mrp : item.mrp); //now we have to subtract some amount from out total
          console.log(toSubTract);
          totalMrp =
            totalMrp -
            toSubTract +
            tempArray[index].select *
              (item.discounted_mrp ? item.discounted_mrp : item.mrp);
          tempArray[index].total = totalMrp;
          setTotal(totalMrp);
          setProducts(tempArray); //updated products and send this result to backend while confirming
          //update total amount of products
        }
        return;
      }
    });
  };

  function deleteProdFromSelected(item) {
    set_ids((ids) => ids.filter((id) => id !== item.item._id));
    setTotal(
      (total) =>
        (total =
          total -
          item.select *
            (item.item.discounted_mrp
              ? item.item.discounted_mrp
              : item.item.mrp))
    );
    setProducts((prods) =>
      prods.filter((prod) => prod.item._id !== item.item._id)
    );
  }

  return (
    <form className="billproductwrapper" onSubmit={submitHandler}>
      <p className="resultswrapper-p">Selected Products</p>
      <div className="billproductwrapperinner">
        {/* all selected items  */}
        {products.length > 0 &&
          products.map((item) => (
            <p className="product-info" key={item.item._id}>
              <span>{item.item.product_name}</span>

              <span
                style={{
                  paddingLeft: "3px",
                  fontFamily: "raleway",
                }}
              >
                Available: &nbsp;
                <span>
                  {item.item.stock}
                  &nbsp;
                </span>
                Price :
                {item.item.discounted_mrp ? (
                  <span>
                    &nbsp; Rs&nbsp;
                    {item.item.discounted_mrp}
                  </span>
                ) : (
                  <span>
                    &nbsp; Rs&nbsp;
                    {item.item.mrp}
                  </span>
                )}
              </span>

              <span
                style={{
                  display: "flex",
                }}
              >
                Quantity:&nbsp;
                <input
                  type="Number"
                  className="product-info-input"
                  min="1"
                  max={item.item.stock}
                  placeholder="1"
                  onChange={(e) => {
                    onChangeHandler(e, item.item);
                  }}
                />
                &nbsp; or
                <button
                  style={{
                    backgroundColor: "#e42e2e",
                    border: "none",
                    marginLeft: "2px",
                    color: "white",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    deleteProdFromSelected(item);
                  }}
                >
                  <DeleteOutline />
                </button>
              </span>
            </p>
          ))}
      </div>
      {total !== 0 && (
        <span
          style={{
            fontFamily: "Raleway",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
        >
          {" "}
          Total : Rs {total}{" "}
        </span>
      )}
      <button className="billproductwrappersubmit">Confirm</button>
    </form>
  );
}
