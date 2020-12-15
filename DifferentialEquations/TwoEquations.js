class TwoEquations {
    constructor(a11, a12, a21, a22, b1, b2, c1, c2, d1, d2, tau1, tau2) {
        this.a11 = a11;
        this.a12 = a12;
        this.a21 = a21;
        this.a22 = a22;

        this.b1 = b1;
        this.b2 = b2;

        this.c1 = c1;
        this.c2 = c2;

        this.d1 = d1;
        this.d2 = d2;

        this.tau1 = tau1;
        this.tau2 = tau2;
        this.h = 0.01;
        this.matrix = [];
        this.vector = [];
    }

    makeMatrix() {
        matrixSize = 1 / this.h;
        this.matrix = Array(matrixSize * 2).fill(Array(matrixSize * 2).fill(0));
        this.vector = Array(matrixSize * 2).fill(0);

    }

    find_x_by_step(stepvalue) {
        return Math.round(stepvalue * 100) - 1;
    }

    solve() {
        solution = gauss(this.matrix, this.vector);
        return solution;
    }

    calculateLagranzValue(parameter_n, parameter_n_1, parameter_n_2, value_n, value_n_1, value_n_2, point) {
        return value_n_2 * (((point - parameter_n_1) * (point - parameter_n)) / ((parameter_n_2 - parameter_n_1) * (parameter_n_2 - parameter_n)))
            + value_n_1 * (((point - parameter_n_2) * (point - parameter_n)) / ((parameter_n_1 - parameter_n_2) * (parameter_n_1 - parameter_n)))
            + value_n * (((point - parameter_n_1) * (point - parameter_n_2)) / ((parameter_n - parameter_n_1) * (parameter_n - parameter_n_2)));
    }

    generate_result_table() {
        // get the reference for the body
        var resultBody = document.getElementById("tableWithResult");
        while (resultBody.firstChild) {
            resultBody.removeChild(resultBody.lastChild);
        }
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var caunter = 0;

        var init_value = parseInt(document.getElementById("twoEquationsX0").value);

        // creating all cells
        for (var i = 0; i < 10; i++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var j = 0; j < 10; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                var valueToPrint = (init_value + Math.random()).toFixed(2);
                var cellText = document.createTextNode(caunter / 100 + ": " + valueToPrint);
                caunter += 1;
                cell.appendChild(cellText);
                cell.setAttribute("style", "border: 1px solid #ddd;padding: 8px");
                row.appendChild(cell);
            }
            if (i % 2 == 0)
                row.setAttribute("style", "text-align: left; padding: 8px;border: 1px solid #ddd;background-color: #f2f2f2");
            else
                row.setAttribute("style", "text-align: left; padding: 8px;border: 1px solid #ddd;");
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        resultBody.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("style", "border-collapse: collapse; border - spacing: 0; width: 100 %; border: 1px solid #ddd; ");
    }
}

function solve() {
    solver = new TwoEquations();
    solver.generate_result_table();
}