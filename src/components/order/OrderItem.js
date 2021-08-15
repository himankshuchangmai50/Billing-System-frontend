import SearchIcon from "@material-ui/icons/Search";
import PdfIcon from "@material-ui/icons/PictureAsPdf";
import context from "../../context/create-context";

import { useState, useContext, useEffect } from "react";
// import jsPdf from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./order.css";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ReceiptSearch({ setSearch }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSearch(input);
  }
  return (
    <form className="searchbarwrapper" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Order id..."
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button>
        <SearchIcon className="searchicon" />
      </button>
    </form>
  );
}

function LoadReceiptForm({ state }) {
  const generatePdf = () => {
    const receipt = document.getElementById("receipt");

    var docDefinition = {
      pageSize: "A5",
      content: [
        {
          text: `Order Successful: ${state._id}`,
          fontSize: 14,
          bold: true,
          margin: [20, 0, 0, 10],
        },

        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            margin: [0, 0, 0, 60],
            headerRows: 1,
            widths: [20, 120, 80, 80, 80],

            body: [
              [
                { text: "#", bold: true },
                { text: "Product", bold: true },
                { text: "Count", bold: true },
                { text: "Price", bold: true },
                { text: "Total", bold: true },
              ],
            ],
          },
          layout: "noBorders",
        },
        {
          text: `Total: ${state.total}`,
          fontSize: 14,
          bold: true,
          margin: [130, 30, 0, 0],
        },
      ],
    };

    console.log(docDefinition);

    state.orders.forEach((item, index) => {
      const itemDetail = [];
      itemDetail.push(index + 1);
      itemDetail.push(item.item.product_name);
      itemDetail.push(item.select);
      item.item.discounted_mrp
        ? itemDetail.push(item.item.discounted_mrp)
        : itemDetail.push(item.item.mrp);
      item.item.discounted_mrp
        ? itemDetail.push(item.item.discounted_mrp * item.select)
        : itemDetail.push(item.item.mrp * item.select);
      docDefinition.content[1].table.body.push(itemDetail);
    });

    pdfMake.createPdf(docDefinition).download(`order-${state._id}.pdf`);
  };

  if (state === undefined) return null;
  return (
    <div>
      <div className="loadreceipt-container" id="receipt">
        <div
          style={{
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Order Successful :&nbsp; {state._id}
          </span>
        </div>
        <table>
          <thead>
            <tr>
            <th>#</th>
            <th>Product</th>
            <th>Count</th>
            <th>Price</th>
            <th>Total</th>
            </tr>
          </thead>

          
            <tbody >
            {state.orders.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.item.product_name}</td>
                <td>{item.select}</td>

                {item.item.discounted_mrp ? (
                  <td>{item.item.discounted_mrp}</td>
                ) : (
                  <td>{item.item.mrp}</td>
                )}

                {item.item.discounted_mrp ? (
                  <td>{item.item.discounted_mrp * item.select}</td>
                ) : (
                  <td>{item.item.mrp * item.select}</td>
                )}
              </tr>
              ))}
            </tbody>
          
        </table>

        {/* {
                
                   state.orders.map((item) => (
                      <div class='innerItemStyle'>
                           <span
                               style={{
                                  fontWeight:'bold'
                              }}
                           >{item.item.product_name}</span>
                          
                           
                           <span>
                               Purchased: {item.select}x
                          </span>
                      </div>
                  ))
              } */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "Raleway",
            fontWeight: "bold",
            fontSize: "20px",
            marginTop: "10px",
          }}
        >
          Total : &nbsp;Rs {state.total}
        </div>
      </div>
      <button className="pdfdownload" onClick={generatePdf}>
        <span className="pdficonn">
          {" "}
          <PdfIcon />
        </span>
        Download
      </button>
    </div>
  );
}

export default function OrderItem({ setSearch, search, history }) {
  const fetchContext = useContext(context);

  const getOrderById = async () => {
    const id = await JSON.parse(localStorage.getItem("login-cred"))._id;
    fetchContext.cache.clear();
    const responseFromBackend = await fetchContext.get(
      `/order/${id}/${search}`
    );
    if (fetchContext.response.ok) {
      if (responseFromBackend) {
        const location = {
          pathname: "/order",
          state: responseFromBackend,
        };
        history.replace(location);
      }
      return;
    }
    alert("Order not Found");
  };

  useEffect(() => {
    if (search === "") {
      return;
    }
    getOrderById();
  }, [search]);

  // const widhtInPx = parseInt(receipt.getBoundingClientRect().width);
  // const heightInPx = parseInt(receipt.getBoundingClientRect().height);
  // const widhtInMm = Math.floor(widhtInPx * 0.264583);
  // const heightInMm = Math.floor(heightInPx * 0.264583) * 5;
  // const pdf = new jsPdf("l", "mm", [heightInMm, widhtInMm]);
  // pdf.fromHTML(receipt, 15, 10);
  // pdf.save(`order-${history.location.state._id}.pdf`);
  // console.log(widhtInPx, heightInPx);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ReceiptSearch setSearch={setSearch} />
      <LoadReceiptForm
        state={
          history.location.state !== undefined
            ? history.location.state
            : undefined
        }
      />
    </div>
  );
}
