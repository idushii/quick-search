enum Delimiter {
    space = ' ',
    tck = ';',
    zpt = ',',
}

class Table {
    public _rows: string[][] = [];
    public _columns: string[] = [];
    public search: string = '';

    constructor(columns?: string[], rows?: string[][]) {
        if (rows) { this.rows = rows; }
        if (columns) { this.columns = columns; }
    }

    get rows() {
        const s = this.search;
        let result = this._rows

        if (this.search) {
            result = this._rows.filter((r) => {
                let flag = false;
                for (const c of r) { if (c.indexOf(s) == 0) { flag = true; } }
                return flag;
            });
        }

        return result.slice(0, 20)
    }

    set rows(rows) {
        this._rows = rows.filter((r) => r && r.length);
    }

    get columns() {
        return this._columns;
    }

    set columns(columns: string[]) {
        for (const c of columns) {
            this._columns.push(c);
        }
    }

    public newLine(line: string[] = []) {
        console.log(this._rows.length);
        if (line && line.length) {
            this._rows.push(line);
        }
    }

    public fromCSV(str: string, params?: { delimiter?: Delimiter, hasTitle?: boolean }) {
        if (!str) { return; }
        const lines = str.split('\r\n');
        let d = Delimiter.space;

        if (params) {
            if (params.delimiter) { d = params.delimiter; }
        }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const cols = line.split(d).filter((r) => r);
            if (i == 0 && params && params.hasTitle) {
                this.columns = cols;
                continue;
            }
            this.newLine(cols);
        }
    }

    public find(str: string) {
        this.search = str;
    }

    get avgWidth() {
        const result: number[] = [];

        for (let i = 0; i < this._columns.length; i++) {
            let sum = 0;

            for (let j = 0; j < this.rows.length; j++) {
                sum += this.rows[j][i].length;
            }

            if (!result[i]) { result[i] = 0; }
            result[i] += sum;
        }

        return result;
    }

    get gridWidths() {
        return this.avgWidth.map((e) => `${e}fr`).join(' ');
    }
}

export { Table, Delimiter };
