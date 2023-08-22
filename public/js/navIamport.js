const userCode = "imp14397622";
IMP.init(userCode);

const payments = () => {
  price = prompt("결제 금액 입력");
  if (price != undefined) {
    IMP.request_pay({
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: "FNTC_" + new Date().getTime(),
      name: "FNTC 캐시 충전",
      amount: price,
      buyer_email: "dongyang.maetress@gmail.com",
      buyer_name: "FNTC 관리자",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 종로구 청와대로 1",
      buyer_postcode: "03048"
    }, (rsp) => {
      if ( rsp.success ) {
        location.href=`/admin/payments?price=${price}`;
      } else {
        var msg = '결제에 실패하였습니다.\n';
        msg += '에러내용 : ' + rsp.error_msg;
        alert(msg);
      }
    });
  }
}