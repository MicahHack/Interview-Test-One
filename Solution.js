const expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};
function solution(expenses) {
    var monthlyMedians = [];
    
    for (var month in expenses) {
        // For the purpose of re-usability, loop through days from 1st of month until first Sunday is found
        var loopNextDay = true;
        var dayCount = 1
        var firstSunday;
        while (loopNextDay) {
            var fullDateString = month.concat("-", dayCount);
            var fullDate = new Date(fullDateString);
            fullDate.setHours(0, 0, 0)
            
            // To work around locale differences, use getDay() method to consistently identify day of the week by number
            if (fullDate.getDay() === 0) {
                firstSunday = fullDate;
                loopNextDay = false;
            }
            dayCount += 1;
        }

        // Iterate through days, and find any before the first Sunday
        var amounts = [];
        Object.keys(expenses[month]).forEach(day => {
            var fullDayDate = new Date(month.concat("-", day));
            fullDayDate.setHours(0, 0, 0)
            if (fullDayDate <= firstSunday) {
                // Iterate through each category, retrieve amounts, and sort from smallest to largest
                var temporaryAmounts = [];
                Object.keys(expenses[month][day]).forEach(expenseCategory => {
                    temporaryAmounts = temporaryAmounts.concat(expenses[month][day][expenseCategory]);
                    temporaryAmounts.sort((a, b) => a - b)
                    amounts = temporaryAmounts;
                })
            }
        })
        
        // Calculate median, and push to result variable
        var monthlyTotal = null;
        if (amounts.length > 0) {
            var middleIndex = amounts.length / 2;
            var amountOne = 0;
            var amountTwo = 0;
            if (!Number.isInteger(middleIndex)) {
                monthlyTotal = amounts[Math.floor(middleIndex)];
            }
            if (Number.isInteger(middleIndex)) {
                amountOne = amounts[middleIndex];
                amountTwo = amounts[middleIndex - 1];
                monthlyTotal = (amountOne + amountTwo) / 2;
            }

            monthlyMedians.push(monthlyTotal)
        }
        else {
            monthlyMedians.push(monthlyTotal);
        }
    }
    
    return monthlyMedians;
}
console.log(solution(expenses));
