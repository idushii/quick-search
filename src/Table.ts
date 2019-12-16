enum Delimiter {
    space = ' ',
    tck = ';',
    zpt = ',',
}

class Table {
    public _rows: string[][] = [];
    public _columns: string[] = [];
    public search: string = '';
    public widths: number[] = [];
    public select: boolean[] = [];
    public _selectAll: boolean = false;

    constructor(columns?: string[], rows?: string[][]) {
        if (rows) { this.rows = rows; }
        if (columns) { this.columns = columns; }
    }

    get rows() {
        const s = this.search;
        let result = this._rows;

        if (this.search) {
            result = this._rows.filter((r) => {
                let flag = false;
                for (const c of r) { if (c.toLocaleLowerCase().indexOf(s) == 0) { flag = true; } }
                return flag;
            });
        }

        return result;
    }

    get rows_reduce() {
        const result = this.rows.slice(0, 100000);
        console.log('end calc');
        return result;
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
            // @ts-ignore
            line.id = this._rows.length;
            this._rows.push(line);
            this.select.push(false);
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

        //this.caclAvgWidth();
    }

    public find(str: string) {
        this.search = str.toLocaleLowerCase();
    }

    public caclAvgWidth() {
        const result: number[] = [];

        for (let i = 0; i < this._columns.length; i++) {
            let sum = 0;

            for (let j = 0; j < this._rows.length; j++) {
                sum += this._rows[j][i].length;
            }

            if (!result[i]) { result[i] = 0; }
            result[i] += sum;
        }
        console.log('end calc width');
        this.widths = result;
    }

    get gridWidths() {
        return '3rem ' + this.widths.map((e) => `${e}fr`).join(' ');
    }

    set cols(w: number[]) {
        this.widths = w
    }

    set selectAll(b: any) {
        this._selectAll = !this._selectAll
        if (b === true || b === false) this._selectAll = b
        for (let i = 0; i < this.rows.length; i++)
            this.select[i] = this._selectAll;
    }

    get selectAll() {
        return this._selectAll
    }

    copy() {
        let payload = ``

        for (let i = 0; i < this.rows.length; i++)
            if (this.select[i])
                payload += this.rows[i].join('\t') + '\r\n'

        const el = document.createElement('textarea');
        el.value = payload;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        this.selectAll = false

    }

}

export { Table, Delimiter };
