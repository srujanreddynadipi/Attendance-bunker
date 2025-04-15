document.addEventListener('DOMContentLoaded', function() {
    // Add background animation
    document.body.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradient 15s ease infinite';

    // Add the animation keyframes to the document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    `;
    document.head.appendChild(style);

    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsDiv = document.getElementById('results');
    
    // Input fields
    const currentAttendanceInput = document.getElementById('currentAttendance');
    const totalClassesInput = document.getElementById('totalClasses');
    const remainingClassesInput = document.getElementById('remainingClasses');
    const targetAttendanceInput = document.getElementById('targetAttendance');
    
    // Error messages
    const currentAttendanceError = document.getElementById('currentAttendanceError');
    const totalClassesError = document.getElementById('totalClassesError');
    const remainingClassesError = document.getElementById('remainingClassesError');
    const targetAttendanceError = document.getElementById('targetAttendanceError');
    
    // Result elements
    const resultBox = document.getElementById('resultBox');
    const resultNumber = document.getElementById('resultNumber');
    const resultText = document.getElementById('resultText');
    const finalAttendance = document.getElementById('finalAttendance');
    
    // Calculation details
    const classesAttendedElem = document.getElementById('classesAttended');
    const totalPossibleClassesElem = document.getElementById('totalPossibleClasses');
    const requiredClassesElem = document.getElementById('requiredClasses');
    const maxBunkableClassesElem = document.getElementById('maxBunkableClasses');
    
    calculateBtn.addEventListener('click', function() {
        // Reset error messages
        currentAttendanceError.style.display = 'none';
        totalClassesError.style.display = 'none';
        remainingClassesError.style.display = 'none';
        targetAttendanceError.style.display = 'none';
        
        // Validate inputs
        let isValid = true;
        
        const currentAttendance = parseFloat(currentAttendanceInput.value);
        if (isNaN(currentAttendance) || currentAttendance < 0 || currentAttendance > 100) {
            currentAttendanceError.style.display = 'block';
            isValid = false;
        }
        
        const totalClasses = parseInt(totalClassesInput.value);
        if (isNaN(totalClasses) || totalClasses < 0) {
            totalClassesError.style.display = 'block';
            isValid = false;
        }
        
        const remainingClasses = parseInt(remainingClassesInput.value);
        if (isNaN(remainingClasses) || remainingClasses < 0) {
            remainingClassesError.style.display = 'block';
            isValid = false;
        }
        
        const targetAttendance = parseFloat(targetAttendanceInput.value);
        if (isNaN(targetAttendance) || targetAttendance < 0 || targetAttendance > 100) {
            targetAttendanceError.style.display = 'block';
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Perform calculations
        const classesAttended = (currentAttendance / 100) * totalClasses;
        const totalPossibleClasses = totalClasses + remainingClasses;
        const requiredClasses = (targetAttendance / 100) * totalPossibleClasses;
        const maxBunkableClasses = Math.floor(classesAttended + remainingClasses - requiredClasses);
        
        // Calculate final attendance if student takes maximum bunks
        let finalAttendancePercentage;
        let finalAttendedClasses;
        
        if (maxBunkableClasses >= 0) {
            finalAttendedClasses = classesAttended + (remainingClasses - maxBunkableClasses);
        } else {
            finalAttendedClasses = classesAttended + remainingClasses;
        }
        
        finalAttendancePercentage = (finalAttendedClasses / totalPossibleClasses) * 100;
        
        // Update calculation details
        classesAttendedElem.textContent = classesAttended.toFixed(2);
        totalPossibleClassesElem.textContent = totalPossibleClasses;
        requiredClassesElem.textContent = requiredClasses.toFixed(2);
        
        // Display results
        if (maxBunkableClasses >= 0) {
            resultBox.className = 'result-box success';
            resultNumber.textContent = maxBunkableClasses;
            
            if (maxBunkableClasses >= remainingClasses) {
                resultText.textContent = "You can miss all remaining classes!";
            } else {
                resultText.textContent = maxBunkableClasses === 1 ? 
                    "You can miss 1 class" : 
                    `You can miss ${maxBunkableClasses} classes`;
            }
            
            maxBunkableClassesElem.textContent = maxBunkableClasses;
            finalAttendance.textContent = `Your final attendance will be ${finalAttendancePercentage.toFixed(2)}%`;
        } else {
            const extraClassesNeeded = Math.abs(maxBunkableClasses);
            resultBox.className = 'result-box error';
            resultNumber.textContent = '0';
            
            if (extraClassesNeeded > remainingClasses) {
                resultText.textContent = "Target attendance not possible";
                finalAttendance.textContent = `Even if you attend all remaining classes, your attendance will only reach ${finalAttendancePercentage.toFixed(2)}%`;
            } else {
                resultText.textContent = "No bunking possible";
                finalAttendance.textContent = `You must attend all remaining classes to achieve ${targetAttendance}% attendance`;
            }
            
            maxBunkableClassesElem.textContent = '0';
        }
        
        // Show results section
        resultsDiv.style.display = 'block';
    });
    
    resetBtn.addEventListener('click', function() {
        // Clear all input fields
        currentAttendanceInput.value = '';
        totalClassesInput.value = '';
        remainingClassesInput.value = '';
        targetAttendanceInput.value = '';
        
        // Hide results section
        resultsDiv.style.display = 'none';
        
        // Reset error messages
        currentAttendanceError.style.display = 'none';
        totalClassesError.style.display = 'none';
        remainingClassesError.style.display = 'none';
        targetAttendanceError.style.display = 'none';
    });
});