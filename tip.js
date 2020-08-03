let nro_rows = 0;
let billAmount = 0;
let tipPercentage = 0;
let tipAmount = 0;
let totalBill = 0;
let sum_billAmount = 0;
let sum_tipAmount = 0;
let sum_totalBill = 0;
let sumTipPercentage = 0;
let avgTipPercentage = 0;

document.addEventListener('show', function(event) {

    let page = event.target;
    
    const range = document.getElementById("tipRange");
    const tipOut = document.getElementById("percentOut");
    const btnCalculate = document.getElementById("btnCalculate");
    const billAmountTxt = document.getElementById("billAmount");
    const resultArea = document.getElementById("result");
    const summary = document.getElementById("test_summary");
    
    range.ondrag = function(){
      tipOut.innerHTML =  range.value + "%";
    }

    btnCalculate.onclick = function(){
     
       
      if(billAmountTxt.value.trim() == "")
          ons.notification.alert("Please enter the bill amount");
      else{

          tipPercentage = range.value;
          billAmount = parseFloat(billAmountTxt.value.split(",").join(""));
          tipAmount = billAmount * (tipPercentage/100);
          totalBill = billAmount + parseFloat(tipAmount);
          nro_rows++;

          sum_billAmount += billAmount;
          sum_tipAmount += tipAmount;
          sum_totalBill += totalBill;
          sumTipPercentage += parseFloat(tipPercentage);
          avgTipPercentage = sumTipPercentage/nro_rows;

          resultArea.innerHTML = `<strong>Tip Amount:</strong> $${currencyFormat(tipAmount)}<br/><strong>Total Bill:</strong> $${currencyFormat(totalBill)}`;

          fillSummary();
          fillTotals();
      }
    }
    
});


document.addEventListener('prechange', function(event) {
  document.querySelector('ons-toolbar .center')
    .innerHTML = event.tabItem.getAttribute('label');
});


function currencyFormat(num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function fillSummary(){
    
    let tbody = document.getElementById("tbody_summary");
    let tr = document.createElement("tr");
    let col_nro = document.createElement("td");
    let col_billAmount = document.createElement("td");
    let col_tipPercentage = document.createElement("td");
    let col_tipAmount = document.createElement("td");
    let col_totalBill = document.createElement("td");
    
    col_nro.innerHTML = nro_rows;
    col_billAmount.innerHTML = "$" + currencyFormat(billAmount);
    col_tipPercentage.innerHTML = tipPercentage + "%";
    col_tipAmount.innerHTML = "$" + currencyFormat(tipAmount);
    col_totalBill.innerHTML = "$" + currencyFormat(totalBill);
    
    if(nro_rows == 1){
       document.getElementById("dv_noRecords").style.display = "none";
    }
        
    tr.appendChild(col_nro);
    tr.appendChild(col_billAmount);
    tr.appendChild(col_tipPercentage);
    tr.appendChild(col_tipAmount);
    tr.appendChild(col_totalBill);
    tbody.appendChild(tr);
}

function fillTotals(){
    
    let tfoot = document.getElementById("tfoot_summary");
    let tr = document.createElement("tr");
    let col_total = document.createElement("td");
    let col_sumBillAmount = document.createElement("td");
    let col_avgTipPercentage = document.createElement("td");
    let col_sumTipAmount = document.createElement("td");
    let col_sumTotalBill = document.createElement("td");
    
    col_total.innerHTML = "TOTAL";
    col_sumBillAmount.innerHTML = "$" + currencyFormat(sum_billAmount);
    col_avgTipPercentage.innerHTML = "Avg Tip: " + avgTipPercentage.toFixed(2) + "%";
    col_sumTipAmount.innerHTML = "$" + currencyFormat(sum_tipAmount);
    col_sumTotalBill.innerHTML = "$" + currencyFormat(sum_totalBill);
    
     if(tfoot.rows.length > 0)
       tfoot.deleteRow(0);
    
    tr.appendChild(col_total);
    tr.appendChild(col_sumBillAmount);
    tr.appendChild(col_avgTipPercentage);
    tr.appendChild(col_sumTipAmount);
    tr.appendChild(col_sumTotalBill);
    tfoot.appendChild(tr);
    
}