export default class StateChangedEvent {
    constructor(tableEvent) {
        this.page = {
            first: tableEvent.first,
            rows: tableEvent.rows,
            page: tableEvent.page,
            pageCount: tableEvent.pageCount,
        },
        this.filter = tableEvent.filters,
        this.sort = tableEvent.multiSortMeta
    }
}