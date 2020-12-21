let additionalFormulaParamsLength = 0;
const inputArgs = ['a1', 'x', 'x1', 'x2'];

function setAdditionalVariablesBuilder(initialParamLength) {
  return function () {
    let result = '';

    for (let index = 0; index < additionalFormulaParamsLength; index++) {
      const paramIndexValue = index + initialParamLength;
      result += ` + ${buildFormulaVariable(paramIndexValue + 1)} `;
    }

    return result;
  };
}

const setAdditionalVariables = setAdditionalVariablesBuilder(2);

function buildFormulaVariable(index) {
  return `a_{${index + 1}} x(t-\\tau_${index})`;
}

function buildFormula() {
  return `$$
    \\begin{aligned}
    &x'=a_{1} x(t) + a_{2} x(t-\\tau_1)+ a_{3} x(t-\\tau_2) ${setAdditionalVariables()} + d
    \\end{aligned}
$$`;
}


function addVariable(event) {
  if (additionalFormulaParamsLength > 2)
    return;
  additionalFormulaParamsLength++;
  const formula_selector = document.getElementById("formula_selector");
  formula_selector.innerHTML = buildFormula();
  renderVariableInputs();

  MathJax.Hub.Typeset();
};

function deleteVariable(event) {
  if (additionalFormulaParamsLength < 1)
    return;
  additionalFormulaParamsLength--;
  const formula_selector = document.getElementById("formula_selector");
  formula_selector.innerHTML = buildFormula();
  renderVariableInputs();

  MathJax.Hub.Typeset();
};


function builderSetVariableInputs(initialParamLength) {
  return function () {
    let result = '';

    for (let index = 0; index < additionalFormulaParamsLength; index++) {
      const currentVariableIndex = initialParamLength + index;
      result += `<tr>
        <td>$$a_{${currentVariableIndex + 1}}: $$</td>
        <td><input type="number" id="twoEquationsA" value="1"></td>
        <td>$$\\tau_{${currentVariableIndex}}: $$</td>
        <td><select size="1" id="twoEquationsTau">
                <option value="1/6">1/6t</option>
                <option value="1/5">1/5t</option>
                <option selected value="1/4">1/4t</option>
                <option value="1/3">1/3t</option>
                <option value="$$1/2t$$">1/2t</option>
            </select>
        </td>
      </tr>`;
    }

    return result;
  };
}

const setVariableInputs = builderSetVariableInputs(3);

function buildCustomizationVariableTable() {
  return `<tr>
      <td colspan="4" align="center">\\(a_{1}:\\)
          <input type="number" id="twoEquationsA" value="3"></td>
    </tr>
    <tr>
    <td>$$a_{2}: $$</td>
    <td><input type="number" id="twoEquationsA" value="-2"></td>
    <td>$$\\tau_{1}: $$</td>
    <td><select size="1" id="twoEquationsTau">
            <option selected value="1/6">1/6t</option>
            <option value="1/5">1/5t</option>
            <option value="1/4">1/4t</option>
            <option value="1/3">1/3t</option>
            <option value="$$1/2t$$">1/2t</option>
        </select>
    </td>
    </tr>
    <tr>
    <td>$$a_{3}: $$</td>
    <td><input type="number" id="twoEquationsA" value="1"></td>
    <td>$$\\tau_{2}: $$</td>
    <td><select size="1" id="twoEquationsTau">
            <option value="1/6">1/6t</option>
            <option value="1/5">1/5t</option>
            <option selected value="1/4">1/4t</option>
            <option value="1/3">1/3t</option>
            <option value="$$1/2t$$">1/2t</option>
        </select>
    </td>
    </tr>
    ${setVariableInputs()}
    <tr>
    <td>$$d: $$</td>
    <td><input type="number" id="twoEquationsD" value="3"></td>
    <td>$$x(0): $$</td>
    <td><input type="number" id="twoEquationsX0" value="1"></td>
    </tr>
    <tr>
    <td colspan="4" align="center"><button class="btn" onclick="solve()">Розв'язати</button></td>
  </tr>`;
}


function renderVariableInputs() {
  const inputTable = document.getElementById('variable_input_table');
  inputTable.innerHTML = '';
  inputTable.insertAdjacentHTML('afterbegin', buildCustomizationVariableTable());
}
