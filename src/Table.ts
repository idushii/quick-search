enum Delimiter {
    space = ' ',
    tck = ';',
    zpt = ',',
}

type Column = {
    Title: string
    Width: string
}

class Table {
    _rows: string[][] = []
    _columns: string[] = []
    _widths: string[] = []
    search: string = ''

    constructor(columns?: string[], rows?: string[][]) {
        if (rows) this.rows = rows;
        if (columns) this.columns = columns;
    }

    get rows() {
        let s = this.search
        if (this.search)
            return this._rows.filter(r => {
                console.log(r.includes(s))
                let flag = false;
                for (let c of r) if (c.indexOf(s) == 0) flag = true;
                return flag;
            });

        return this._rows;
    }

    set rows(rows) {
        this._rows = rows.filter(r => r && r.length);
    }

    get columns() {
        return this._columns;
    }

    set columns(columns: any[]) {
        for (let c of columns)
            if (typeof (c) == "string") {
                this._columns.push(c)
                this._widths.push('1')
            } else {
                if ((c as Column).Title) this._columns.push((c as Column).Title)
                if ((c as Column).Width) this._widths.push((c as Column).Width)
            }
    }

    newLine(line: string[] = []) {
        if (line && line.length)
            this._rows.push(line);
    }

    fromCSV(str: string, params?: { delimiter?: Delimiter.space, hasTitle?: boolean }) {
        if (!str) return;
        let lines = str.split('\n');
        let d = Delimiter.space

        if (params) {
            if (params.delimiter) d = params.delimiter
        }

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i]
            let cols = line.split(d).filter(r => r)
            if (i == 0 && params && params.hasTitle) {
                this.columns = cols;
                continue;
            }
            this.newLine(cols);
        }
    }

    find(str: string) {
        this.search = str;
    }

    get avgWidth() {
        let result: number[] = [];

        for (let c in this._columns) {
            //if (result[c]) result[c] += this._rows.reduce(r => )
        }

        return result;
    }

    get gridWidths() {
        return this._widths.map(e => `${e}fr`).join(' ')
    }
}

export { Table, Delimiter }