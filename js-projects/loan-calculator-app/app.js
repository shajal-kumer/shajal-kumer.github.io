// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) { 

    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
 });


// Calculate Results
function calculateResults(e) {
    console.log('calculating...');
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


   const principal = parseFloat(amount.value);
   const calculatedInterest = parseFloat(interest.value) / 100 / 12;
   const calculatedPayment = parseFloat(years.value) * 12;

   // Compute monthly payment
   const x = Math.pow(1 + calculatedInterest, calculatedPayment);
   const monthly = (principal*x*calculatedInterest) / (x-1);

   if(isFinite(monthly)) {
       monthlyPayment.value = monthly.toFixed(2);
       totalPayment.value = (monthly * calculatedPayment).toFixed(2);
       totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

       // Show Results 
       document.getElementById('results').style.display = 'block';

       // Hide Loading
       document.getElementById('loading').style.display = 'none';

   } else {
       showError('Please check your number...');
   }

    e.preventDefault();
}

function showError(error) {
      // Hide Loading
      document.getElementById('loading').style.display = 'none';
    // Create a div
    const errorDiv = document.createElement('div');

    // Get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create text node and apend to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 seconds
    setTimeout(clearError, 3000);
}

// clear Error 

function clearError() {
    document.querySelector('.alert').remove();
}