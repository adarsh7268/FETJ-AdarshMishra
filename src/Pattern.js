import React, { useState } from 'react';

const Pattern = () => {
  const [numberOfLines, setNumberOfLines] = useState(5);
  const [pattern, setPattern] = useState('');

  const printDiamond = (n) => {
    if (n % 2 === 0) n++;
    let string = "FORMULAQSOLUTIONS";
    var fullString=string+string+string+string+string+string+string+string+string+string+string+string;
    let startIdx = 0;
    let spaceCount = Math.floor(n / 2);
    let result = '';

    for (let i = 1; i <= n; i += 2) {
      let space = " ".repeat(spaceCount);
      let line = space + fullString.substr(startIdx, i).padEnd(n);
      result += line + '\n';
      startIdx++;
      spaceCount--;
    }

    spaceCount = 1;
    for (let i = n - 2; i >= 1; i -= 2) {
      let space = " ".repeat(spaceCount);
      let line = space + fullString.substr(startIdx, i).padEnd(n);
      result += line + '\n';
      startIdx++;
      spaceCount++;
    }

    return result;
  };

  const handleClick = () => {
    setPattern(printDiamond(numberOfLines));
  };

  return (
    <div className="bg-gray-200 p-4 m-4 rounded-md">
      <label>
        Enter the number of lines:
        <input type="number" value={numberOfLines} onChange={(e) => setNumberOfLines(e.target.value)} />
      </label>
      <button className=' bg-slate-500 rounded-lg' onClick={handleClick}>Generate Pattern</button>
      <pre>{pattern}</pre>
    </div>
  );
};

export default Pattern;
