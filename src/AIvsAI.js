const AIvsAI = (props) => {

return(<div class="row d-flex justify-content-center">
<table class="table">
  <tbody>
    {/* {Array.from({ length: 5}).map((_, outerIndex) => (
      <tr key={outerIndex}>
          {Array.from({ length: 5}).map((_, innerIndex) => (
            <td class="text-center border-2 border-dark border-rounded" key={innerIndex}>
                <button class="cell btn btn-secondary" id={"btn"+((outerIndex*5)+innerIndex)} onClick={handleClick}>{(outerIndex*5)+innerIndex}</button>
            </td>
          ))}
      </tr>
  ))} */}
    {props.matrix.map((row, outerIndex) => (
      <tr key={outerIndex}>
        {row.map((column, innerIndex) => (
          <td
            class="text-center border-2 border-dark border-rounded"
            key={innerIndex}
          >
            <button
              className={`cell btn btn-secondary ${column === "x" ? 'x-color' : column === "o" ? 'o-color' : ''}`}
              id={outerIndex * 5 + innerIndex}
              
            >
              {/* {outerIndex * 5 + innerIndex} */}
              {column && column !== null
                ? column === "x"
                  ? "X"
                  : "O"
                : outerIndex * 5 + innerIndex}
            </button>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
</div>);

};

export default AIvsAI;