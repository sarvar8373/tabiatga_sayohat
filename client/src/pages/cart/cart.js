import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function Cart() {
  return (
    <div>
      {" "}
      <header
        id="header"
        className="header-area style-2 header-border absulate-header"
      >
        <Header />
      </header>{" "}
      <div className="bradcumb-area cart overlay-bg-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <div className="bradcumb text-center">
                <h3>Cart</h3>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-area pt-90">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="table-responsive mb-30">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <p>MAHSULOT NOMI</p>
                      </th>
                      <th colspan="2">
                        <p>Mahsulot narxi</p>
                      </th>
                      <th scope="col">
                        <p>Miqdori</p>
                      </th>
                      <th scope="col">
                        <p>Umumiy narx</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className="product-cart-wrap">
                          <div className="product-cart-close">
                            <a href="/">X</a>
                          </div>
                          <div className="product-cart-tbl-thumb">
                            <img src="img/product/ct1.jpg" alt="img" />
                          </div>
                          <div className="product-cart-tbl-content">
                            <a href="/">
                              <h6>Shveytsariya tog'li sarguzashtlari</h6>
                            </a>
                            <p>2022 yil 25 aprel dushanba</p>
                            <a href="/">Tahrirlash</a>
                          </div>
                        </div>
                      </th>
                      <td colspan="2">
                        <p className="price">$1,205</p>
                      </td>
                      <td>
                        <div className="quickview-quality">
                          <div className="cart-plus-minus">
                            <input
                              className="cart-plus-minus-box"
                              type="text"
                              name="qtybutton"
                              value="1"
                            />
                          </div>
                        </div>
                      </td>
                      <td>$30.00</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="product-cart-wrap">
                          <div className="product-cart-close">
                            <a href="/">X</a>
                          </div>
                          <div className="product-cart-tbl-thumb">
                            <img src="img/product/ct2.jpg" alt="img" />
                          </div>
                          <div className="product-cart-tbl-content">
                            <a href="/">
                              <h6>Shveytsariya tog'li sarguzashtlari</h6>
                            </a>
                            <p>2022 yil 25 aprel dushanba</p>
                            <a href="/">Tahrirlash</a>
                          </div>
                        </div>
                      </th>
                      <td colspan="2">
                        <p className="price">$550</p>
                      </td>
                      <td className="table-quantity">
                        <div className="quickview-quality">
                          <div className="cart-plus-minus">
                            <input
                              className="cart-plus-minus-box"
                              type="text"
                              name="qtybutton"
                              value="1"
                            />
                          </div>
                        </div>
                      </td>
                      <td>$100.00</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="product-cart-wrap">
                          <div className="product-cart-close">
                            <a href="/">X</a>
                          </div>
                          <div className="product-cart-tbl-thumb">
                            <img src="img/product/ct3.jpg" alt="img" />
                          </div>
                          <div className="product-cart-tbl-content">
                            <a href="/">
                              <h6>Shveytsariya tog'li sarguzashtlari</h6>
                            </a>
                            <p>2022 yil 25 aprel dushanba</p>
                            <a href="/">Tahrirlash</a>
                          </div>
                        </div>
                      </th>
                      <td colspan="2">
                        <p className="price">$750</p>
                      </td>
                      <td className="table-quantity">
                        <div className="quickview-quality">
                          <div className="cart-plus-minus">
                            <input
                              className="cart-plus-minus-box"
                              type="text"
                              name="qtybutton"
                              value="1"
                            />
                          </div>
                        </div>
                      </td>
                      <td>$80.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-btn mb-30">
                <input
                  className="code-input single-input text-center mb-5"
                  placeholder="Coupon Code"
                  type="password"
                />
                <a className="btn border-theme" href="/">
                  Kuponni qo'llash
                </a>
                <div className="right-cart-btn">
                  <a className="btn btn-theme-dark" href="/">
                    Savatni yangilash
                  </a>
                  <a className="btn btn-theme" href="/">
                    Ro'yxatdan o'chirilish
                  </a>
                </div>
              </div>
              <div className="cart-total">
                <h4>Savat jami</h4>
                <div className="single-total subtotal">
                  <p>Mahsulotlarning oraliq jami</p>
                  <p className="normal"> $5,665</p>
                </div>
                <div className="single-total total">
                  <p>Mahsulotlarning oraliq jami</p>
                  <p> $5,665</p>
                </div>
                <a className="btn btn-theme float-right" href="/">
                  Ro'yxatdan o'chirilishda davom etish
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="partner-area pt-85 pb-220">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10"></div>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}
