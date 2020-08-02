interface IFilter {
    HtmlIdentifier: string;
    Name: string;
    Active: boolean;
    Filter(item: Item): boolean;
    //create a type/enum for this
    Type: string;
    AsyncConnectedCallback?(): void;
}

interface IFilterSelect extends IFilter {
    Options: any[];
    Value: string;
}