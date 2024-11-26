interface Question {
    question: string;
    answer: string;
  }
  
export const Questions: Question[] = [
{ 
    question: "$$\\sin(x) + \\sin(y)$$",
    answer: "$$2 \\sin\\left(\\frac{x + y}{2}\\right) \\cos\\left(\\frac{x - y}{2}\\right)$$"
},
{ 
    question: "$$\\sin(x) - \\sin(y)$$",
    answer: "$$2 \\cos\\left(\\frac{x + y}{2}\\right) \\sin\\left(\\frac{x - y}{2}\\right)$$"
},
{ 
    question: "$$\\cos(x) + \\cos(y)$$",
    answer: "$$2 \\cos\\left(\\frac{x + y}{2}\\right) \\cos\\left(\\frac{x - y}{2}\\right)$$"
},
{ 
    question: "$$\\cos(x) - \\cos(y)$$",
    answer: "$$-2 \\sin\\left(\\frac{x + y}{2}\\right) \\sin\\left(\\frac{x - y}{2}\\right)$$"
},
{ 
    question: "$$\\sin(x) \\sin(y)$$",
    answer: "$$\\frac{1}{2} [\\cos(x - y) - \\cos(x + y)]$$"
},
{ 
    question: "$$\\cos(x) \\cos(y)$$",
    answer: "$$\\frac{1}{2} [\\cos(x + y) + \\cos(x - y)]$$"
},
{ 
    question: "$$\\sin\\left(\\frac{\\theta}{2}\\right)$$",
    answer: "$$\\pm \\sqrt{\\frac{1 - \\cos(\\theta)}{2}}$$"
},
{ 
    question: "$$\\cos\\left(\\frac{\\theta}{2}\\right)$$",
    answer: "$$\\pm \\sqrt{\\frac{1 + \\cos(\\theta)}{2}}$$"
},
{ 
    question: "$$\\tan\\left(\\frac{\\theta}{2}\\right)$$",
    answer: "$$\\pm \\sqrt{\\frac{1 - \\cos(\\theta)}{1 + \\cos(\\theta)}}$$"
},
];
