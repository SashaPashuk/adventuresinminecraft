const cartListContainerElements=document.querySelector(".cartPage-list"),renderCartItems=t=>{let a="";t.forEach(({})=>{a+=`
        <li class="cartPage-list-item">
        <img src="../assets/images/product-image/img_product2.png" alt="" />
        <h3>Название товара</h3>
        <div class="cartPage-list-item-amount">
          <span>Количество:</span>
          <div class="cartPage-list-item-amount-actions">
            <img src="../assets/images/icons/arrow_left.svg" alt="" />
            <span>2</span>
            <img src="../assets/images/icons/arrow_right.svg" alt="" />
          </div>
        </div>
        <div class="cartPage-list-item-expiration">
          <span>Срок действия покупки:</span>
          <div class="cartPage-list-item-expiration-actions">
            <button>30 Дней</button>
            <button>Навсегда</button>
          </div>
        </div>
        <div>
          <span>Цена:</span>
          <span>€15</span>
        </div>
        <div class="cart-container">
          <img
            class="cart-container-icon"
            src="../assets/images/icons/delete-icon.svg"
            alt=""
          />
        </div>
      </li>
    `}),cartListContainerElements.innerHTML=a},cartPaymentButtonElement=(renderCartItems([1,2,3]),document.querySelector("#cart-payment-button"));cartPaymentButtonElement?.addEventListener("click",t=>{t.preventDefault(),window.location.href="/pages/success-payment.html"});