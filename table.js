// Vanilla JavaScript Datatable


let dataTable = ((tablename) => {

    /**
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
    */

    document.querySelector(`#${tablename}`).classList.add("datatable");
    var mainTopBar = document.createElement('div');
    mainTopBar.id = "topBar";
    document.body.prepend(mainTopBar);

    var inputSearch = document.createElement('input');
    inputSearch.type = "search";
    inputSearch.id = "searching";
    var selectDropdown = document.querySelector(`#${tablename}`);
    mainTopBar.appendChild(inputSearch);

    var pageNav = document.createElement('div');
    pageNav.id = "pageNavPosition";
    pageNav.className = "pager-nav";
    selectDropdown.after(pageNav);

    var newNodeSelect = document.createElement('select');
    newNodeSelect.id = "recordData";
    var myTableInsert = document.querySelector('#searching');
    myTableInsert.after(newNodeSelect);

    var newNodeExport = document.createElement('button');
    newNodeExport.id = "exportButton";

    newNodeExport.innerText = "Export";
    let ExportBtn = document.getElementById("recordData");

    ExportBtn.after(newNodeExport);
    let getExportbtn = document.getElementById("exportButton");
    let btn, newbtn, select, pageNavigation, body;
    btn = 1;
    body = document.body;

    const searching = document.getElementById("searching");
    const myTable = document.getElementById(tablename);

    const Table = (() => {
        const collectData = [];
        Array.from(myTable.children[1].children).forEach(ectract => {
            collectData.push(Array.from(ectract.children).map(ext => {
                return ext.innerHTML;
            }));
        });
        return collectData;
    });

    const tableData = Table();
    const refreshTable = (data) => {
        const table = myTable.children[1];
        table.innerHTML = '';
        data.forEach(row => {
            const currentRow = document.createElement('tr');
            row.forEach(col => {
                const currentColumn = document.createElement('td');
                currentColumn.innerText = col;
                currentRow.appendChild(currentColumn);
            });
            table.appendChild(currentRow);
        });
    }

    const searchData = (arr, search) => {
        if (!searchData) {
            return arr;
        }
        return arr.filter(row => {
            return row.find(item => {
                return item.toLowerCase().includes(search.toLowerCase());
            });
        });
    }

    const sortTableByColumn = (table, column, asc = true) => {
        const dirModifier = asc ? 1 : -1;
        const tBody = table.tBodies[0];
        const rows = Array.from(tBody.querySelectorAll("tr"));

        const sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        });

        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
        }

        tBody.append(...sortedRows);

        table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
    }

    const columns = (() => {
        var footerTable = '', footerRow = '', footerColumn = '', footerSelect = '', markers = [], empties;
        var tableNew = document.getElementById(tablename);
        footerTable = document.createElement('table');
        footerTable.id = "tab_footer";
        footerTable.className = "search_area";
        tableNew.before(footerTable);

        const newSearchData = (arr, charArray = []) => {
            if (!searchData) {
                return arr;
            }
            return arr.filter(row => {
                let found = charArray.every((item) => row.includes(item));
                if (found) {
                    return row;
                }
            });
        }


        const searchData = (arr, search) => {
            if (!searchData) {
                return arr;
            }
            return arr.filter(row => {
                return row.find(item => {
                    return item.toLowerCase().includes(search.toLowerCase());
                })
            })
        }

        const columns = myTable.children[0].children[0].children.length;

        footerRow = document.createElement('tr');



        footerTable.appendChild(footerRow);

        for (let i = 0; i <= columns - 1; i++) {
            // markers[i] = "allData";
            window['p' + i] = null;

            footerSelect = document.createElement('select');

            let footerSelectDefault = document.createElement('option');
            footerSelectDefault.innerText = "All Data";
            footerSelectDefault.value = "allData";
            footerSelectDefault.setAttribute("selected", "selected");
            footerSelect.appendChild(footerSelectDefault);

            footerSelect.className = `FS${i}`;

            footerSelect.onchange = function () {

                empties = markers.length - markers.filter(String).length;


                const x = document.getElementsByClassName(`FS${i}`);

                if (window['p' + i] != null && footerSelectDefault.selected == false) {
                    window['p' + i] = x[0].value;
                    markers.splice(i, 1, window['p' + i]);
                }
                if (window['p' + i] == null && footerSelectDefault.selected == false) {
                    window['p' + i] = x[0].value;
                    markers[i] = window['p' + i];
                }
                if (window['p' + i] != null && footerSelectDefault.selected == true) {
                    markers.splice(markers.indexOf(window['p' + i]), 1);
                }

                var cleanArray = markers.filter(function () { return true });

                if (cleanArray != '') {
                    refreshTable(newSearchData(tableData, markers));
                }
                else {
                    let select = document.getElementById('recordData');
                    getData(select.value, 1);
                }
            };

            footerColumn = document.createElement('td');

            footerRow.appendChild(footerColumn);

            footerColumn.appendChild(footerSelect);

            arr = tableData;

            arr.filter(row => {
                let data = row[i];
                const currentOption = document.createElement('option');
                currentOption.innerText = data;
                currentOption.value = data;
                footerSelect.appendChild(currentOption);
            });
        }
    });

    const getData = ((showPages, page) => {


        page = showPages * page;
        page = page - showPages;

        let arr = [];
        let matrix = [];
        let start = page;
        let leanth = showPages;

        tableData.forEach((element, k) => {
            if (start <= k && leanth != 0) {
                leanth -= 1
                matrix.push(tableData[k]);
            }
        });

        arr.push(matrix);
        const table = myTable.children[1];
        table.innerHTML = '';
        arr.forEach(row => {
            row.forEach(demo => {
                const currentRow = document.createElement('tr');
                demo.forEach(col => {
                    const currentColumn = document.createElement('td');
                    currentColumn.innerText = col;
                    currentRow.appendChild(currentColumn);
                });
                table.appendChild(currentRow);
            });
        });

        var slet = document.getElementById("recordData").value;
        let dem1 = Math.ceil(tableData.length / slet);
        document.getElementById("pageNavPosition").innerHTML = "";
        let pagePosition = document.getElementById("pageNavPosition");
        let nextPage = document.createElement("button");
        nextPage.id = "nPage";
        nextPage.innerText = ">";

        let CPage = document.createElement("button");
        CPage.id = "CPage";
        CPage.innerText = "1";

        let prevPage = document.createElement("button");
        prevPage.id = "pPage";
        prevPage.innerText = "<";

        let pNumber1 = document.createElement("div");
        pNumber1.id = "pNumber";

        pagePosition.appendChild(prevPage);

        for (let fn = 1; fn <= dem1; fn++) {
            let CPage = document.createElement("button");
            CPage.id = "CPage" + fn;
            CPage.className = "pagNum";
            CPage.innerText = fn;
            document.getElementById("pageNavPosition").appendChild(CPage);

            document.getElementById("CPage" + fn).addEventListener('click', () => {
                btn = fn;
                getData(slet, fn);
                if (dem1 == fn) {
                    console.log(fn);
                    var nextedPage = document.getElementById("nPage");
                    nextedPage.setAttribute("disabled", "disabled");
                }
                document.getElementById("CPage" + fn).className = "pagNum isActive";

            });
        }

        pagePosition.appendChild(nextPage);
        var previousPage = document.getElementById("pPage");
        var nextedPage = document.getElementById("nPage");

        if (btn == 1) {
            previousPage.setAttribute("disabled", "disabled");
        }
        else {
            var previousPage = document.getElementById("pPage");
            previousPage.removeAttribute("disabled");
        }

        nextedPage.addEventListener('click', () => {

            if (btn == 0) {
                btn = 1;
            }
            newbtn = btn;
            newbtn = parseInt(newbtn) + 1;
            btn = newbtn;

            console.log();
            select = document.getElementById('recordData').value;
            getData(select, newbtn);
            pageNavigation = Math.ceil(tableData.length / select);

            if (newbtn >= 2) {
                var previousPage = document.getElementById("pPage");
                previousPage.removeAttribute("disabled");
            }
            if (newbtn == pageNavigation) {
                var nextedPage = document.getElementById("nPage");
                nextedPage.setAttribute("disabled", "disabled");
            }
            document.getElementById("CPage" + btn).className = "pagNum isActive";
        });

        previousPage.addEventListener('click', () => {
            newbtn = btn;
            btn = parseInt(newbtn) - 1;
            select = document.getElementById('recordData').value;
            getData(select, btn);
            console.log(newbtn);
            if (newbtn <= 2) {

            }
            else {
                var previousPage = document.getElementById("pPage");
                console.log(newbtn);
                previousPage.removeAttribute("disabled");
            }
            document.getElementById("CPage" + btn).className = "pagNum isActive";
        });


    });

    let pagination = ((optionArray = []) => {

        let select = document.getElementById('recordData');
        let countRows = myTable.children[1].children.length;
        optionArray.forEach((item) => {
            if (item > countRows - 1) {
                console.error(`Plz Set Variation according to data your total rows are ${countRows}  your data is less then : ${item}`)
            }
            else {
                var opt = document.createElement('option');
                opt.value = item;
                opt.innerHTML = item;
                select.appendChild(opt);
            }
        })
        getData(select.value, 1);
        select.addEventListener('change', () => {
            getData(select.value, 1);
        });
    });

    const exportTableToExcel = (() => {
        var rows = [];
        for (var i = 0, row; row = myTable.rows[i]; i++) {
            column1 = row.cells[0].innerText.replace(',', '');
            column2 = row.cells[1].innerText.replace(',', '');
            column3 = row.cells[2].innerText.replace(',', '');
            column4 = row.cells[3].innerText.replace(',', '');

            rows.push(
                [
                    column1,
                    column2,
                    column3,
                    column4

                ]
            );

        }
        csvContent = "data:text/csv;charset=utf-8,";

        rows.forEach(function (rowArray) {
            if (rowArray != ' ') {
                row = rowArray.join(",");
                csvContent += row + "\r\n";
            }
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Datatable.csv");
        document.body.appendChild(link);

        link.click();
    });

    document.querySelectorAll(".table-sortable th").forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");

            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });


    let Styling = (() => {

        // create styling Button
        let styleBtn = document.createElement("button");
        styleBtn.id = "StyleOpenButton";
        styleBtn.innerText = "Style";
        getExportbtn.after(styleBtn);

        // create model
        let styleBody = document.createElement("div");
        styleBody.id = "myModel";
        myTableInsert.before(styleBody);
        let getmyModel = document.getElementById("myModel");

        // create model content
        let styleContent = document.createElement("div");
        styleContent.id = "modelContent";
        styleBody.appendChild(styleContent);

        // create model close btn
        let styleClose = document.createElement("span");
        styleClose.id = "modelClose";
        styleClose.innerText = "X";
        styleContent.appendChild(styleClose);
        let getmodelClose = document.getElementById("modelClose");

        // create model table
        let styleTable = document.createElement("table");
        styleTable.id = "modelTable";
        styleContent.appendChild(styleTable);



        let clickStyle = document.getElementById("StyleOpenButton");
        let clickStyle2 = document.getElementById("modelClose");
        clickStyle.addEventListener('click', () => {
            getmyModel.style.backgroundColor = "#fff";
            getmyModel.style.display = "block";
        });

        clickStyle2.addEventListener('click', () => {
            getmyModel.style.display = "none";
        });

        let createtableSubmit = document.createElement('table');
        createtableSubmit.id = "mtablebtn";
        styleContent.appendChild(createtableSubmit);
        let createtrSubmit = document.createElement('tr');
        createtableSubmit.appendChild(createtrSubmit);
        let createtdSubmit = document.createElement('td');
        createtrSubmit.appendChild(createtdSubmit);
        // create style submited button
        let styleSubmit = document.createElement("button");
        styleSubmit.id = "styleButton";
        styleSubmit.innerText = "Submited";
        createtdSubmit.appendChild(styleSubmit);

        let style = document.createElement("style");
        style.type = "text/css";
        document.querySelector("head").appendChild(style);

        let main = ((element, headColor, headBcolor, headFont, name) => {


            // create model table tr1
            let styleTabletr1 = document.createElement("tr");
            // styleTabletr1.id = "modelTabletr1";
            styleTabletr1.id = "modelTabletr" + headColor;
            styleTable.appendChild(styleTabletr1);

            // create model table td1
            let styleTabletd1 = document.createElement("td");
            // styleTabletd1.id = "modelTabletd1";
            styleTabletd1.id = "modelTabletd1" + headColor;
            styleTabletr1.appendChild(styleTabletd1);

            // create model table td2
            let styleTabletd2 = document.createElement("td");
            // styleTabletd2.id = "modelTabletd2";
            styleTabletd2.id = "modelTabletd2" + headColor;
            styleTabletr1.appendChild(styleTabletd2);

            // create model table td3
            let styleTabletd3 = document.createElement("td");
            // styleTabletd3.id = "modelTabletd3";
            styleTabletd3.id = "modelTabletd3" + headColor;
            styleTabletr1.appendChild(styleTabletd3);

            // create th color
            window["Color" + headColor] = document.createElement("input");
            window["Color" + headColor].id = headColor;
            window["Color" + headColor].type = "color";
            styleTabletd1.appendChild(window["Color" + headColor]);

            // create th label
            let stylethlabel = document.createElement("label");
            stylethlabel.id = "sthLabel";
            stylethlabel.innerText = `Changed table ${name} heading color`;
            window["Color" + headColor].before(stylethlabel);

            // create th backgroundColor
            window["bColor" + headBcolor] = document.createElement("input");
            window["bColor" + headBcolor].id = headBcolor;
            window["bColor" + headBcolor].type = "color";
            styleTabletd2.appendChild(window["bColor" + headBcolor]);

            // create th background label
            let stylethblabel = document.createElement("label");
            stylethblabel.id = "sthLabel";
            stylethblabel.innerText = `Changed table ${name} Background`;
            window["bColor" + headBcolor].before(stylethblabel);

            // create th font select
            window["font" + headFont] = document.createElement("select");
            window["font" + headFont].id = headFont;
            styleTabletd3.appendChild(window["font" + headFont]);

            // create th Font label
            let stylethbFlabel = document.createElement("label");
            stylethbFlabel.id = "sthLabel";
            stylethbFlabel.innerText = `Changed table ${name} Font Style`;
            window["font" + headFont].before(stylethbFlabel);

            let thfont = document.getElementById(headFont);

            const thfontFamily = ((element1, optionArray = {}) => {
                for (const [key, value] of Object.entries(optionArray)) {
                    var opt = document.createElement('option');
                    opt.value = key;
                    opt.innerHTML = value;
                    element1.appendChild(opt);
                }
            });


            thfontFamily(thfont, {
                "Courier New, Courier, monospace": "Courier New, Courier, monospace",
                "Verdana, Geneva, Tahoma, sans-serif": "Verdana, Geneva, Tahoma, sans-serif",
                "fantasy": "fantasy",
                "Arial, Helvetica, sans-serif": "Arial, Helvetica, sans-serif",
                "cursive": "cursive",
                "monospace": "monospace",
                "system-ui": "system-ui"
            });

            let css = ((element2, property) => {

                function componentToHex(c) {
                    var hex = c.toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                }

                function rgbToHex(r, g, b) {
                    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
                }

                let SliceValue = window.getComputedStyle(element2, null).getPropertyValue(property);
                let r = SliceValue.slice(4).split(',')[0];
                let g = SliceValue.split(',')[1];
                let b = SliceValue.slice(0, -1).split(',')[2];
                return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
            });

            let getstylethColor;
            let getstylebthColor;

            getstylethColor = document.getElementById(headColor);
            getstylethColor.value = css(element, 'color');

            getstylebthColor = document.getElementById(headBcolor);
            getstylebthColor.value = css(element, 'background-color');

            let clickSubmit = document.getElementById("styleButton");

            let Css1 = (element) => {

                if (element.id != "") {
                    window["css" + name] = `#${element.id} { color: ${getstylethColor.value} !important ; background-color: ${getstylebthColor.value} !important ; font-family: ${thfont.value} !important; } `;
                    style.innerHTML += window["css" + name];
                }
                else if (element.parentElement.tagName.toLowerCase() == "thead") {
                    window["css" + name] = `${element.parentElement.tagName.toLowerCase() + ' ' + element.tagName.toLowerCase()} { color: ${getstylethColor.value} !important ; background-color: ${getstylebthColor.value} !important ; font-family: ${thfont.value} !important; }`;
                    style.innerHTML += window["css" + name];
                }
                else {
                    window["css" + name] = `${element.tagName.toLowerCase()} { color: ${getstylethColor.value} !important ; background-color: ${getstylebthColor.value} !important ; font-family: ${thfont.value} !important; }`;
                    style.innerHTML += window["css" + name];
                }

            };

            clickSubmit.addEventListener('click', () => {
                Css1(element);
                getmyModel.style.display = "none";
            });
            return element;
        });

        main(document.getElementById(tablename).children[0].children[0], "HeadColor", "HeadBcolor", "HeadFont", "Head");
        main(document.getElementById("recordData"), "RecordDataColor", "RecordDataBColor", "RecordDataFont", "Data");
        main(document.getElementById(tablename).children[1], "HeadC1olor", "HeadBco1lor", "HeadF1ont", "Body");
        main(document.getElementById("tab_footer"), "TabFooterColor", "TabFooterBColor", "TabFooterFont", "Column");

    });

    newNodeExport.addEventListener('click', () => {
        exportTableToExcel();
    })
    searching.addEventListener('keyup', (value) => {
        refreshTable(searchData(tableData, value.target.value))
    });

    pagination([5, 10, 15, 50, 90]);

    columns();

    Styling();


});
