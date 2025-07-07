document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('application-form');
  const steps = document.querySelectorAll('.step');
  const stepContents = document.querySelectorAll('.step-content');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const successMessage = document.getElementById('success-message');
  const restartBtn = document.getElementById('restart-btn');
  const closeBtn = document.getElementById('close-btn');
  let currentStep = 1;

  // Initialize form
  updateStepper();

  // Form validation function
  function validateCurrentStep() {
    const currentStepContent = document.querySelector(`.step-content[data-step="${currentStep}"]`);
    const inputs = currentStepContent.querySelectorAll('input[required]');
    
    for (let input of inputs) {
      if (!input.value.trim()) {
        input.focus();
        return false;
      }
      
      // Additional validation for specific fields
      if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
        alert('Please enter a valid email address');
        return false;
      }
      
      if (input.type === 'number' && input.hasAttribute('min') && input.hasAttribute('max')) {
        const value = parseFloat(input.value);
        if (value < parseFloat(input.min) || value > parseFloat(input.max)) {
          alert(`Please enter a value between ${input.min} and ${input.max}`);
          return false;
        }
      }
    }
    
    return true;
  }

  // Update stepper UI
  function updateStepper() {
    steps.forEach((step, index) => {
      const stepNum = parseInt(step.dataset.step);
      const isActive = stepNum === currentStep;
      step.classList.toggle('active', isActive);
      
      // Mark steps as completed
      if (stepNum < currentStep) {
        step.classList.add('completed');
      } else {
        step.classList.remove('completed');
      }
    });

    stepContents.forEach(content => {
      const contentStep = parseInt(content.dataset.step);
      content.classList.toggle('active', contentStep === currentStep);
    });

    // Update button states
    prevBtn.disabled = currentStep === 1;
    nextBtn.style.display = currentStep === steps.length ? 'none' : 'block';
    submitBtn.style.display = currentStep === steps.length ? 'block' : 'none';
  }

  // Next button click handler
  nextBtn.addEventListener('click', function() {
    if (!validateCurrentStep()) return;
    
    if (currentStep < steps.length) {
      currentStep++;
      updateStepper();
      scrollToTop();
    }
  });

  // Previous button click handler
  prevBtn.addEventListener('click', function() {
    if (currentStep > 1) {
      currentStep--;
      updateStepper();
      scrollToTop();
    }
  });

  // Submit button click handler
  submitBtn.addEventListener('click', function() {
    if (!validateCurrentStep()) return;
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show the success message
    showSuccessMessage();
  });

  // Restart button click handler
  restartBtn.addEventListener('click', function() {
    form.reset();
    currentStep = 1;
    updateStepper();
    hideSuccessMessage();
    scrollToTop();
  });

  // Close button click handler
  closeBtn.addEventListener('click', function() {
    hideSuccessMessage();
  });

  // Helper function to show success message
  function showSuccessMessage() {
    successMessage.classList.add('active');
  }

  // Helper function to hide success message
  function hideSuccessMessage() {
    successMessage.classList.remove('active');
  }

  // Helper function to scroll to top of form
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});


