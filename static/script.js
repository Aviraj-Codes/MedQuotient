document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    // Form elements
    const form = document.getElementById('insuranceForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultsSection = document.getElementById('results');
    const predictionAmount = document.getElementById('predictionAmount');
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.font-semibold'); // Get these once
    const toastDesc = toast.querySelector('.text-sm');       // Get these once
    // Form inputs
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const bmiInput = document.getElementById('bmi');
    const childrenSelect = document.getElementById('children');
    const smokerSelect = document.getElementById('smoker');
    const regionSelect = document.getElementById('region');
    // Toast functionality
    function showToast(title, description, duration = 3000) { // Added duration parameter
        toastTitle.textContent = title;
        toastDesc.textContent = description; 
        // Ensure no conflicting classes before showing
        toast.classList.remove('translate-x-full');
        // Force a reflow to ensure the transition plays from the beginning
        void toast.offsetWidth; 
        toast.classList.add('toast-show');  
        setTimeout(() => {
            hideToast();
        }, duration);
    }
    function hideToast() {
        toast.classList.remove('toast-show');
        toast.classList.add('translate-x-full');
    }
    // Prediction calculation function
    function calculatePrediction(formData) {
        const basePrice = 5000;
        const ageMultiplier = parseInt(formData.age) * 50;
        const bmiAdjustment = parseFloat(formData.bmi) > 30 ? 1000 : 0;
        const smokerAdjustment = formData.smoker === 'yes' ? 2000 : 0;
        const childrenAdjustment = parseInt(formData.children) * 300;
        
        return basePrice + ageMultiplier + bmiAdjustment + smokerAdjustment + childrenAdjustment;
    }
    // Form validation
    function validateForm() {
        const inputs = [ageInput, genderSelect, bmiInput, childrenSelect, smokerSelect, regionSelect];
        return inputs.every(input => input.value.trim() !== '');
    }
    // Update submit button state
    function updateSubmitButton() {
        const isValid = validateForm();
        submitBtn.disabled = !isValid;
        if (isValid) 
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        else 
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    // Add event listeners to form inputs
    [ageInput, genderSelect, bmiInput, childrenSelect, smokerSelect, regionSelect].forEach(input => {
        input.addEventListener('change', updateSubmitButton);
        input.addEventListener('input', updateSubmitButton);
    });
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) {
            showToast('Error', 'Please fill in all fields', 4000); // Increased duration for error
            return;
        }
        // Show loading state
        submitBtn.innerHTML = '<div class="spinner"></div>Calculating...';
        submitBtn.disabled = true;
        // Collect form data
        const formData = {
            age: ageInput.value,
            gender: genderSelect.value,
            bmi: bmiInput.value,
            children: childrenSelect.value,
            smoker: smokerSelect.value,
            region: regionSelect.value
        };
        // Simulate API call with setTimeout
        setTimeout(() => {
            const prediction = calculatePrediction(formData);
            // Update UI with results
            predictionAmount.textContent = `$${prediction.toLocaleString()}`;
            resultsSection.classList.remove('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Reset button
            submitBtn.innerHTML = 'Get My Quote';
            submitBtn.disabled = false;
            updateSubmitButton();
            // Show success toast
            showToast('Prediction Complete!', 'Your insurance estimate has been calculated.');
            // Re-initialize icons in the results section
            lucide.createIcons();  
        }, 2000);
    });
    // Initialize button state
    updateSubmitButton();
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    // Observe all animated elements
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    // Add form validation messages
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('border-red-500');     
            // Remove error styling when user starts typing
            this.addEventListener('input', function() {
                this.classList.remove('border-red-500');
            }, { once: true });
        });
    });
    // Add number input constraints
    ageInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        /*if (value < 18) this.value = 18;
        if (value > 100) this.value = 100;*/
    });
    bmiInput.addEventListener('input', function() {
        const value = parseFloat(this.value);
        /*if (value < 15) this.value = 15;
        if (value > 50) this.value = 50;*/
    });
});
// Flask integration helper functions
window.InsuranceCalculator = {
    // Function to get form data (useful for Flask integration)
    getFormData: function() {
        return {
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            bmi: document.getElementById('bmi').value,
            children: document.getElementById('children').value,
            smoker: document.getElementById('smoker').value,
            region: document.getElementById('region').value
        };
    },

    // Function to set prediction result (useful for Flask integration)
    setPrediction: function(amount) {
        const predictionAmount = document.getElementById('predictionAmount');
        const resultsSection = document.getElementById('results');
        predictionAmount.textContent = `$${parseInt(amount).toLocaleString()}`;
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Re-initialize icons
        lucide.createIcons();
    },

    // Function to show custom toast messages
    // Note: This function will now use the same improved showToast logic
    showToast: function(title, description, duration = 3000) { 
        const toast = document.getElementById('toast');
        const toastTitle = toast.querySelector('.font-semibold');
        const toastDesc = toast.querySelector('.text-sm');
        toastTitle.textContent = title;
        toastDesc.textContent = description;
        toast.classList.remove('translate-x-full');
        void toast.offsetWidth; 
        toast.classList.add('toast-show');
        setTimeout(() => {
            toast.classList.remove('toast-show');
            toast.classList.add('translate-x-full');
        }, duration);
    },
    // Function to validate form
    isFormValid: function() {
        const inputs = ['age', 'gender', 'bmi', 'children', 'smoker', 'region'];
        return inputs.every(id => document.getElementById(id).value.trim() !== '');
    }
};
