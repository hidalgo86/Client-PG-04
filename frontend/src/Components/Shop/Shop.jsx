import React, { useState, useEffect } from "react";
import * as ReactRedux from "react-redux";
import { removeAllCart, setLogin, addToCart } from "../../redux/actions/Cart/CartAction";
import CartItem from "./CartItem";
import style from "./Shop.module.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PaymentCreate from "../PayMents/PaymentCreate/PaymentCreate";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getClientSecret } from "../../redux/actions/Stripe/Stripe";
import { BsFillCartCheckFill  } from "react-icons/bs";
import { BsArrowReturnLeft } from "react-icons/bs";






function Shop() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [buy, setBuy] = useState(false);
  const { cartproduct } = ReactRedux.useSelector((state) => state.cartReducer);
  const { cartLoginRed } = ReactRedux.useSelector((state) => state.cartReducer);
  const { loginUser } = ReactRedux.useSelector(
    (state) => state.userLoginReducer
  );
  const dispatch = ReactRedux.useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      // console.log("CARTTTLOGIN", cartLoginRed)
      if (cartLoginRed) {
        // console.log("acaestoy");
        // // console.log("LOGIN", isLogin);
        // console.log("USER", user);
        // console.log("LOGINUSER", loginUser);
        // console.log("voy a ejecutar cartLogin");
        cartLogin();
        dispatch(setLogin(false));
      }
    }
  }, [dispatch, isAuthenticated, user]);

  const clearCart = () => {
    dispatch(removeAllCart(loginUser));
  };

  const priceTotal = () => {
    return cartproduct?.reduce(
      (acc, prod) => acc + prod.prodDetail.price * prod.quantity,
      0
    );
  };

  const payment = () => {
    if (loginUser.id && isAuthenticated && cartproduct?.length > 0) {
      dispatch(getClientSecret(loginUser.id));
      setBuy(true);
    }
  };

  const cartLogin = () => {
    // console.log("estoy en cartLogin");
    const items = JSON.parse(window.localStorage.getItem("cartState"));
    // console.log("ITEMS", items);
    // console.log("USER", loginUser);

    items.cartproduct.map((e) => {
      let prodTotal = e;
      let data = { prodTotal, loginUser };
      // console.log("cartloginDATA", data);
      dispatch(addToCart(data));
    });
  };

  return (
    <div>
      {buy === false && (
        <div className={style.container}>
          <h2> Tu carrito de compras <BsFillCartCheckFill size="1.5rem" color="black"/></h2>
          <div>
            <div >
              {cartproduct?.length ? (
                cartproduct.map((p) => (
                  <CartItem
                    className={style.cardDiv}
                    key={p.prodDetail.id}
                    name={p.prodDetail.name}
                    price={p.prodDetail.price}
                    quantity={p.quantity}
                    id={p.prodDetail.id}
                    image={p.prodDetail.image}
                  />
                ))
              ) : (
                <div>
                  <spam> Tu carrito esta vacio </spam>
                </div>
              )}
            </div>
          </div>

          {cartproduct?.length ? (
            <h3 className={style.total}>Total sin costo de envío: ${priceTotal()}</h3>
          ) : (
            <></>
          )}
          {cartproduct?.length ? (
            <div>
              {!isAuthenticated || !loginUser.email ? (
                <button
                  className={style.button1}
                  onClick={() => loginWithRedirect()}
                >
                  Comprar
                </button>
              ) : (
                buy === false && (
                  <button className={style.button1} onClick={payment}>
                    Comprar 
                  </button>
                )
              )}
              <>
              <button className={style.button2} onClick={clearCart}>
                VACIAR CARRITO
              </button>
              </>
              <Link   className={style.link} to={"/"}>
              <button className={style.button3}>  <BsArrowReturnLeft/> TIENDA</button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}

      {buy === true &&
      isAuthenticated &&
      loginUser.id &&
      cartproduct?.length > 0 ? (
        <div className={style.payment}>
          <div>
            <PaymentCreate userId={loginUser.id} />
          </div>
        </div>
      ) : null}

      {buy === true &&
      !isAuthenticated &&
      !loginUser.id &&
      cartproduct?.length > 0 ? (
        <>
          <button
            onClick={() => loginWithRedirect()}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <BiUser size="1.5rem" />
            Login
          </button>
        </>
      ) : null}
    </div>
  );
}
export default Shop;
