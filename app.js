const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);



const form = document.getElementById('taxForm');
const modal = document.getElementById('modalBody');


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const grossIncome = parseFloat(
      document.getElementById("grossIncome").value
    );
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value
    );
    const deductions = parseFloat(document.getElementById("deductions").value);
    const age = document.getElementById("age").value;

    let isValid = true;

    const errorIcons = document.querySelectorAll(".error-icon");
    errorIcons.forEach((icon) => (icon.style.display = "none"));
    const errorTooltips = document.querySelectorAll(".error-tooltip");
    errorTooltips.forEach((tooltip) => (tooltip.style.display = "none"));

    if (isNaN(grossIncome)) {
      document.getElementById("grossIncomeError").style.display = "block";
      document.getElementById("grossIncomeErrorTooltip").style.display =
        "block";
      isValid = false;
    }

    if (isNaN(extraIncome)) {
      document.getElementById("extraIncomeError").style.display = "block";
      document.getElementById("extraIncomeErrorTooltip").style.display =
        "block";
      isValid = false;
    }

    if (isNaN(deductions)) {
      document.getElementById("deductionsError").style.display = "block";
      document.getElementById("deductionsErrorTooltip").style.display = "block";
      isValid = false;
    }

    if (age === "") {
      document.getElementById("ageError").style.display = "block";
      document.getElementById("ageErrorTooltip").style.display = "block";
      isValid = false;
    }

    if (isValid) {
      let tax = 0;
      if (grossIncome + extraIncome - deductions > 800000) {
        if (age === "<40") {
          tax = 0.3 * (grossIncome + extraIncome - deductions - 800000);
        } else if (age === "≥40 &lt;60") {
          tax = 0.4 * (grossIncome + extraIncome - deductions - 800000);
        } else if (age === "≥60") {
          tax = 0.1 * (grossIncome + extraIncome - deductions - 800000);
        }
      }

      const totalIncome = grossIncome + extraIncome - tax;
      
      
    document.querySelector(".modal-title").innerText =
      "Your overall income will be";

      modal.innerHTML = `
        <h3>${totalIncome}</h3>
        <p>after tax deductions</p>
        `;
        
        const modalElement = document.getElementById("successModal");
        modalElement.classList.add("show");
        modalElement.style.display = "block";

        const closeBtn = document.querySelector('[data-bs-dismiss="modal"]');
        closeBtn.addEventListener('click', ()=>{
          const modalElement = document.getElementById("successModal");
          modalElement.classList.remove("show");
          modalElement.style.display = "none";
        })
      
    }
    
  });
