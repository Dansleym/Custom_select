class CustomSelect {
    constructor(
        selectClass,
        wrapperClass,
        liClickCallback,
        spanClass,
        ulClass,
        liClass
    ) {
        this.selectClass = selectClass;
        this.wrapperClass = wrapperClass || "select-wrapper";
        this.spanClass = spanClass || "select-selected-option";
        this.ulClass = ulClass || "select-list";
        this.liClass = liClass || "select-list-item";

        this._defaultSelected = undefined;
        this._liClickCallback = liClickCallback || undefined;

        this._init();
    }

    _init() {
        this.getSelects();
        this.processSelects();
    }

    getSelects() {
        this.selects = document.querySelectorAll(this.selectClass);
    }

    processSelects() {
        [...this.selects]?.forEach((_select) => {
            this.processSingleSelect(_select);
        });
    }

    processSingleSelect(_select) {
        const newSelect = this.wrapSelect(_select);
        this.generateListWithOptions(newSelect);
        this.generateClickabelSpan(newSelect);
    }

    wrapSelect(_select, wrapper) {
        const clonedSelect = _select.cloneNode(true)
        wrapper = wrapper || document.createElement("div");
        wrapper.classList.add(this.wrapperClass);

        document.addEventListener("click", function (event) {
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove("show");
            }
        });

        wrapper.appendChild(clonedSelect)
        _select.replaceWith(wrapper);
        return clonedSelect;
    }

    generateClickabelSpan(_select) {
        let span = document.createElement("span");
        span.classList.add(this.spanClass);
        span.innerText = this._defaultSelected.text;

        span.addEventListener("click", () => {
            span.closest(`.${this.wrapperClass}`).classList.toggle("show");
        });
        _select.after(span);
    }

    generateListWithOptions(_select) {
        let options = _select.options;
        let list = document.createElement("ul");
        list.classList.add(this.ulClass);

        [...options]?.forEach((_option) => {
            let li = document.createElement("li");
            li.classList.add(this.liClass);

            li.setAttribute("data-value", _option.value);
            li.innerText = _option.text;
            if (_option.selected) {
                this._defaultSelected = _option;
            }

            const defaultAction = (event) => {
                _select.value = event.target.getAttribute("data-value");
                _select.nextSibling.innerText = event.target.innerText;
                list.closest(`.${this.wrapperClass}`).classList.toggle("show");
            };

            li.addEventListener("click", (event) => {
                if (this._liClickCallback) {
                    if (this._liClickCallback(event)) {
                        defaultAction(event);
                    }
                } else {
                    defaultAction(event);
                }
            });

            list.appendChild(li);
        });
        _select.after(list);
    }
}
export default CustomSelect;