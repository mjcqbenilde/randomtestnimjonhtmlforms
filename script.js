document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Toggle
    const hamburger = document.getElementById("hamburger");
    const navDropdown = document.getElementById("nav-dropdown");

    hamburger.addEventListener("click", function () {
      navDropdown.classList.toggle("show");
    });


    // Submission form
    
    const form = document.getElementById('studentForm');

    // Name format validation
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    nameInput.addEventListener('blur', function() {
        const value = this.value;
        if (!value.includes(',') || value.split(',').length !== 2 || value.trim().endsWith(',')) {
            nameError.textContent = 'Name must follow the format: Surname, First Name';
        } else {
            nameError.textContent = '';
        }
    });

    // Nickname validation
    const nicknameInput = document.getElementById('nickname');
    const nicknameError = document.getElementById('nicknameError');

    nicknameInput.addEventListener('blur', function() {
        const value = this.value;
        if (value.length < 1 || value.length > 30) {
            nicknameError.textContent = 'Nickname must be between 1 and 30 characters long';
        } else {
            nicknameError.textContent = '';
        }
    });

    // ID Number validation
    const idNumberInput = document.getElementById('idNumber');
    const idNumberError = document.getElementById('idNumberError');

    idNumberInput.addEventListener('blur', function() {
        const value = this.value;
        if (value.length !== 8 || !value.startsWith('1')) {
            idNumberError.textContent = 'ID Number must be exactly 8 digits and starts with 1';
        } else {
            idNumberError.textContent = '';
        }
    });

    // Benilde Email validation
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    emailInput.addEventListener('blur', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email) || !email.endsWith('@benilde.edu.ph')) {
            emailError.textContent = 'Please enter a valid b-mail address';
        } else {
            emailError.textContent = '';
        }
    });

    // Transferee and Second Degree checkbox functionality
    const transfereeCheckbox = document.querySelector('input[name="Transferee"]');
    const secondDegreeCheckbox = document.querySelector('input[name="Second Degree"]');
    let isTransferee = false;
    let isSecondDegree = false;

    transfereeCheckbox.addEventListener('change', updateApplicantType);
    secondDegreeCheckbox.addEventListener('change', updateApplicantType);

    function updateApplicantType() {
        isTransferee = transfereeCheckbox.checked;
        isSecondDegree = secondDegreeCheckbox.checked;
    }

    // Scholarship checkbox functionality
    const isScholarCheckbox = document.getElementById('isScholar');
    const scholarshipDetailsInput = document.getElementById('scholarshipDetails');
    
    isScholarCheckbox.addEventListener('change', function() {
        scholarshipDetailsInput.disabled = !this.checked;
        if (!this.checked) {
            scholarshipDetailsInput.value = '';
        }
    });

    window.addEventListener('message', function(event) {
        // Verify the origin if needed
        // if (event.origin !== "https://script.google.com") return;
        
        if (event.data && event.data.result) {
          if (event.data.result === 'success') {
            alert('Form submitted successfully!');
            form.reset();
            scholarshipDetailsInput.disabled = true;
          } else {
            console.error('Submission error:', event.data.message);
            alert(`Submission failed: ${event.data.message}`);
          }
        }
      });
  

    // Contact Number validation
    const contactNumberInput = document.getElementById('contactNumber');
    const contactNumberError = document.getElementById('contactNumberError');
    
    contactNumberInput.addEventListener('blur', function() {
        const value = this.value;
        if (value.length !== 11) {
            contactNumberError.textContent = 'Contact Number must be exactly 11 digits';
        } else {
            contactNumberError.textContent = '';
        }
    });

    // Facebook link validation
    const facebookLinkInput = document.getElementById('facebookLink');
    const facebookLinkError = document.getElementById('facebookLinkError');

    facebookLinkInput.addEventListener('blur', validateFacebookLink);

    function validateFacebookLink() {
        const value = facebookLinkInput.value.trim();
        facebookLinkError.textContent = '';
    
        if (value && !value.match(/^(https?:\/\/)?(www\.)?facebook\.com\/.+/i)) {
            facebookLinkError.textContent = 'Please enter a valid Facebook profile URL';
            return false;
        }
        return true;
    }

    // Terms left validation
    const termsLeftInput = document.getElementById('termsLeft');
    const termsLeftError = document.getElementById('termsLeftError');
    
    termsLeftInput.addEventListener('blur', function() {
        const value = parseInt(this.value);
        if (isNaN(value) || value < 6 || value > 15) {
            termsLeftError.textContent = 'Number of terms left must be between 6 and 15';
        } else {
            termsLeftError.textContent = '';
        }
    });

    // Google forms link validation
    const googleDriveLinkInput = document.getElementById('googleDriveLink');
    const googleDriveLinkError = document.getElementById('googleDriveLinkError');

    googleDriveLinkInput.addEventListener('blur', validateGoogleDriveLink);

    function validateGoogleDriveLink() {
        const value = googleDriveLinkInput.value.trim();
        googleDriveLinkError.textContent = '';
        
        if (value && !value.match(/^(https?:\/\/)?(www\.)?drive\.google\.com\/.+/i)) {
            googleDriveLinkError.textContent = 'Please enter a valid Google Drive URL';
            return false;
        }
        return true;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        let isValid = true;
    
        // Re-run all validations
        if (!nameInput.value.includes(',') || nameInput.value.split(',').length !== 2 || nameInput.value.trim().endsWith(',')) {
            nameError.textContent = 'Name must follow the format: Surname, First name';
            isValid = false;
        }
    
        if (nicknameInput.value.length < 1 || nicknameInput.value.length > 30) {
            nicknameError.textContent = 'Nickname must be between 1 and 30 characters long';
            isValid = false;
        }
    
        const idValue = idNumberInput.value.toString();
        if (idValue.length !== 8 || !idValue.startsWith('1')) {
            idNumberError.textContent = 'ID Number must be exactly 8 digits and starts with 1';
            isValid = false;
        }
    
        const emailValue = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue && (!emailRegex.test(emailValue) || !emailValue.endsWith('@benilde.edu.ph'))) {
            emailError.textContent = 'Please enter a valid b-mail address';
            isValid = false;
        }

        // Set applicantTypeStatus based on transferee/second degree status
        const applicantTypeStatus = (isTransferee || isSecondDegree) ? 'Yes' : 'No';
        const formData = new FormData(form);
        formData.append('applicantTypeStatus', applicantTypeStatus);
    
        const contactValue = contactNumberInput.value.toString();
        if (contactValue.length !== 11) {
            contactNumberError.textContent = 'Contact Number must be exactly 11 digits';
            isValid = false;
        }
    
        if (facebookLinkInput.value && !validateFacebookLink()) {
            isValid = false;
        }
    
        const termsValue = parseInt(termsLeftInput.value);
        if (isNaN(termsValue) || termsValue < 6 || termsValue > 15) {
            termsLeftError.textContent = 'Number of terms left must be between 6 and 15';
            isValid = false;
        }
    
        if (googleDriveLinkInput.value && !validateGoogleDriveLink()) {
            isValid = false;
        }
    
        // Send via fetch if all validations pass
        if (isValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            const formData = new URLSearchParams;
            for (const pair of new FormData(form)) {
                formData.append(pair[0], pair[1]);
            }

            if (isTransferee || isSecondDegree) {
                formData.append('applicantTypeStatus', 'Yes');
            } else {
                formData.append('applicantTypeStatus', 'No');
            }

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                redirect: 'manual' // Important for handling Google Apps Script redirects
              })
              .then(async (response) => {
                // For Google Apps Script, we need to handle the redirect manually
                if (response.type === 'opaqueredirect') {
                  return { result: 'success' }; // Assume success if we get a redirect
                }
                
                try {
                  const data = await response.json();
                  if (!response.ok) throw new Error(data.message || 'Request failed');
                  return data;
                } catch (error) {
                  throw new Error('Failed to parse response');
                }
              })
              .then(data => {
                alert('Form submitted successfully!');
                form.reset();
                scholarshipDetailsInput.disabled = true;
              })
              .catch(error => {
                console.error('Submission error:', error);
                alert('Form submitted successfully!');
                form.reset();
                scholarshipDetailsInput.disabled = true;
              })
              .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
              });
        }
    });
});
