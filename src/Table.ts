enum Delimiter {
    space = ' ',
    tck = ';',
    zpt = ',',
}

class Table {
    _rows: string[][] = []
    _columns: string[] = []
    search: string = ''

    constructor(columns?: string[], rows?: string[][]) {
        if (rows) this.rows = rows;
        if (columns) this.columns = columns;
    }

    get rows() {
        let s = this.search
        if (this.search)
            return this._rows.filter(r => {
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

    set columns(columns: string[]) {
        for (let c of columns)
            this._columns.push(c)
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

        for (let i = 0; i < this._columns.length; i++) {
            let sum = 0;

            for (let j = 0; j < this.rows.length; j++) {
                sum += this.rows[j][i].length
            }

            if (!result[i]) result[i] = 0
            result[i] += sum;
        }

        return result;
    }

    get gridWidths() {
        return this.avgWidth.map(e => `${e}fr`).join(' ')
    }
}

export { Table, Delimiter }