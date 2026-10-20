 // Consultation Form WhatsApp Integration
const consultationForm = document.getElementById('consultationForm');

if (consultationForm) {
  consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
 
    const name = document.getElementById('consultName').value;
    const phone = document.getElementById('consultPhone').value;
    const message = document.getElementById('consultMessage').value;

    // Format the WhatsApp text message
    const whatsappText = `Hello, I would like to request a consultation:%0A` +
                         `👤 Name: ${encodeURIComponent(name)}%0A` +
                         `📱 Phone: ${encodeURIComponent(phone)}%0A` +
                       `💬 Inquiry: ${encodeURIComponent(message)}`;

    // Your WhatsApp recipient number
    const whatsappNumber = "967775580028";
    
    // Open WhatsApp URL in a new tab
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form fields after sending
    this.reset();  
  });
}

function darkMode(){
document.body.classList.toggle('dark');
}