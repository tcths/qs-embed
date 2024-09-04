/// <reference types="node" />

import type { AggregationFunction } from '@aws-sdk/client-quicksight';
import type { ColumnIdentifier } from '@aws-sdk/client-quicksight';
import type { DateDimensionField } from '@aws-sdk/client-quicksight';
import type { FilterGroup } from '@aws-sdk/client-quicksight';
import type { ThemeConfiguration } from '@aws-sdk/client-quicksight';
import type { VisualCustomAction } from '@aws-sdk/client-quicksight';
import type { VisualCustomActionOperation } from '@aws-sdk/client-quicksight';

export declare type ActionOperation = {
    CallbackOperation: CallbackOperation;
} & VisualCustomActionOperation;

export declare interface AttributionOptions {
    overlayContent?: boolean;
}

export declare interface BaseContentOptions {
    onMessage?: EventListener_2;
}

export declare abstract class BaseExperience<ExperienceContentOptions extends ContentOptions, InternalExperience extends InternalExperiences, Experience extends Experiences, TransformedExperienceContentOptions extends TransformedContentOptions, ExperienceFrame extends BaseExperienceFrame<ExperienceContentOptions, TransformedExperienceContentOptions, InternalExperience>> {
    protected abstract experience: Experience;
    protected abstract internalExperience: InternalExperience;
    protected abstract experienceId: string;
    protected abstract experienceFrame: ExperienceFrame;
    protected readonly frameOptions: FrameOptions;
    protected readonly contentOptions: ExperienceContentOptions;
    protected readonly controlOptions: ControlOptions;
    protected readonly experienceIdentifiers: Set<string>;
    protected logger?: LogProvider;
    protected constructor(frameOptions: FrameOptions, contentOptions: ExperienceContentOptions, controlOptions: ControlOptions, experienceIdentifiers: Set<string>);
    static getExperienceIdentifier: (experience: InternalExperiences) => string;
    send: <EventMessageValue extends EventMessageValues>(messageEvent: EmbeddingMessageEvent<MessageEventName>) => Promise<ResponseMessage<EventMessageValue>>;
    addEventListener: (eventName: MessageEventName, listener: EventListener_2) => {
        remove: () => EventManager;
    };
    setLogProvider: (logProvider: LogProvider) => this;
    protected getInternalExperienceInfo: <EmbeddingInternalExperience extends InternalExperiences, EmbeddingExperience extends Experiences>(experience: EmbeddingExperience) => InternalExperienceInfo<EmbeddingInternalExperience>;
    protected transformContentOptions: <TCO extends TransformedContentOptions>(filteredOptions: TCO, unrecognizedContentOptions: object) => TCO;
    protected warnUnrecognizedContentOptions: (unrecognizedProperties: string[]) => void;
    protected abstract extractExperienceFromUrl: (url: string) => Experience;
    private validateFrameOptions;
}

export declare abstract class BaseExperienceFrame<ExperienceContentOptions extends ContentOptions, TransformedExperienceContentOptions extends TransformedContentOptions, InternalExperience extends InternalExperiences> {
    protected readonly frameOptions: FrameOptions;
    protected readonly contentOptions: ExperienceContentOptions;
    protected readonly controlOptions: ControlOptions;
    protected readonly transformedContentOptions: TransformedExperienceContentOptions;
    protected readonly experienceId: string;
    protected readonly internalExperience: InternalExperience;
    protected readonly onChange: EventListener_2;
    protected url: string;
    protected origin_url: string;
    private readonly MESSAGE_RESPONSE_TIMEOUT;
    iframe: EmbeddingIFrameElement | null;
    container: HTMLElement;
    onMessage: EventListener_2;
    timeoutInstance?: NodeJS.Timeout;
    protected constructor(frameOptions: FrameOptions, controlOptions: ControlOptions, contentOptions: ExperienceContentOptions, transformedContentOptions: TransformedExperienceContentOptions, internalExperience: InternalExperience, experienceIdentifier: string, interceptMessage?: EventListener_2);
    send: <EventMessageValue extends EventMessageValues = EventMessageValues>(messageEvent: TargetedMessageEvent) => Promise<SuccessResponse | ErrorResponse<EventMessageValue> | DataResponse<EventMessageValue>>;
    buildParameterString: (parameters?: ParametersAsObject) => string;
    buildQueryString: (options: Omit<TransformedExperienceContentOptions, 'onMessage' | 'parameters'> & Pick<InternalExperience, 'contextId' | 'discriminator'>) => string;
    createExperienceIframe: () => void;
    addInternalEventListener: (eventName: MessageEventName, listener: EventListener_2) => {
        remove: () => EventManager;
    };
    private validateBaseUrl;
    private setTimeoutInstance;
    private onLoadHandler;
    private getContainer;
    private decorateOnChange;
    private decorateOnMessage;
    private initializeMutationObserver;
    protected abstract buildExperienceUrl: (baseUrl: string) => string;
}

export declare type BinDatapointRawValue = {
    Min: number | null;
    Max: number | null;
    IsMaxInclusive: boolean;
};

export declare const CALCULATED_METRIC_COLUMN_TYPE: {
    readonly INTEGER: null;
    readonly STRING: null;
    readonly DECIMAL: null;
    readonly DATETIME: null;
};

export declare interface CallbackOperation {
    EmbeddingMessage: object;
}

export declare class ChangeEvent<EventName extends ChangeEventName, EventMessageValue extends EventMessageValues = EventMessageValues> extends EmbeddingEvent<EventName, EventMessageValue> {
    eventLevel: ChangeEventLevel;
    constructor(eventName: EventName, eventLevel: ChangeEventLevel, message?: EventMessageValue, data?: EventData);
}

export declare const ChangeEventLevel: {
    readonly ERROR: "ERROR";
    readonly INFO: "INFO";
    readonly WARN: "WARN";
};

export declare type ChangeEventLevel = (typeof ChangeEventLevel)[keyof typeof ChangeEventLevel];

export declare const ChangeEventName: {
    readonly UNRECOGNIZED_CONTENT_OPTIONS: "UNRECOGNIZED_CONTENT_OPTIONS";
    readonly UNRECOGNIZED_FRAME_OPTIONS: "UNRECOGNIZED_FRAME_OPTIONS";
    readonly UNRECOGNIZED_EVENT_TARGET: "UNRECOGNIZED_EVENT_TARGET";
    readonly FRAME_NOT_CREATED: "FRAME_NOT_CREATED";
    readonly NO_BODY: "NO_BODY";
    readonly NO_CONTAINER: "NO_CONTAINER";
    readonly INVALID_CONTAINER: "INVALID_CONTAINER";
    readonly NO_URL: "NO_URL";
    readonly INVALID_URL: "INVALID_URL";
    readonly NO_FRAME_OPTIONS: "NO_FRAME_OPTIONS";
    readonly INVALID_FRAME_OPTIONS: "INVALID_FRAME_OPTIONS";
    readonly FRAME_STARTED: "FRAME_STARTED";
    readonly FRAME_MOUNTED: "FRAME_MOUNTED";
    readonly FRAME_LOADED: "FRAME_LOADED";
    readonly FRAME_REMOVED: "FRAME_REMOVED";
};

export declare type ChangeEventName = (typeof ChangeEventName)[keyof typeof ChangeEventName];

export declare type ChangeMessageEvents = ChangeEvent<typeof InfoChangeEventName.FRAME_LOADED, string> | ChangeEvent<typeof InfoChangeEventName.FRAME_MOUNTED, string> | ChangeEvent<typeof InfoChangeEventName.FRAME_STARTED, string> | ChangeEvent<typeof InfoChangeEventName.FRAME_REMOVED, string> | ChangeEvent<typeof WarnChangeEventName.UNRECOGNIZED_CONTENT_OPTIONS, string> | ChangeEvent<typeof WarnChangeEventName.UNRECOGNIZED_FRAME_OPTIONS, string> | ChangeEvent<typeof WarnChangeEventName.UNRECOGNIZED_EVENT_TARGET, string> | ChangeEvent<typeof ErrorChangeEventName.FRAME_NOT_CREATED, string> | ChangeEvent<typeof ErrorChangeEventName.NO_BODY, string> | ChangeEvent<typeof ErrorChangeEventName.NO_CONTAINER, string> | ChangeEvent<typeof ErrorChangeEventName.INVALID_CONTAINER, string> | ChangeEvent<typeof ErrorChangeEventName.INVALID_URL, string> | ChangeEvent<typeof ErrorChangeEventName.NO_URL, string> | ChangeEvent<typeof ErrorChangeEventName.NO_FRAME_OPTIONS, string> | ChangeEvent<typeof ErrorChangeEventName.INVALID_FRAME_OPTIONS, string>;

export declare type CleanUpCallback = () => void;

export declare interface ConsoleContentOptions extends BaseContentOptions {
    locale?: string;
}

export declare class ConsoleExperience extends BaseExperience<ConsoleContentOptions, InternalConsoleExperience, IConsoleExperience, TransformedConsoleContentOptions, ConsoleExperienceFrame> {
    protected experience: IConsoleExperience;
    protected internalExperience: InternalConsoleExperience;
    protected experienceId: string;
    protected experienceFrame: ConsoleExperienceFrame;
    protected currentPage: string | undefined;
    constructor(frameOptions: FrameOptions, contentOptions: ConsoleContentOptions, controlOptions: ControlOptions, experienceIdentifiers: Set<string>);
    createSharedView: () => Promise<ResponseMessage>;
    private interceptMessage;
    protected extractExperienceFromUrl: (url: string) => IConsoleExperience;
}

export declare class ConsoleExperienceFrame extends BaseExperienceFrame<ConsoleContentOptions, TransformedConsoleContentOptions, InternalConsoleExperience> {
    constructor(frameOptions: FrameOptions, controlOptions: ControlOptions, contentOptions: ConsoleContentOptions, transformedContentOptions: TransformedConsoleContentOptions, internalExperience: InternalConsoleExperience, experienceIdentifier: string, interceptMessage?: EventListener_2);
    buildExperienceUrl: (baseUrl: string) => string;
}

export declare type ContentOptions = VisualContentOptions | DashboardContentOptions | QSearchContentOptions | ConsoleContentOptions | ControlContentOptions | GenerativeQnAContentOptions;

export declare type ControlContentOptions = BaseContentOptions;

export declare class ControlExperience {
    static FRAME_TIMEOUT: number;
    private readonly container;
    private readonly urlInfo;
    private readonly internalExperience;
    private readonly eventManager;
    private readonly onChange?;
    private readonly experience;
    private readonly logger?;
    private readonly controlExperienceFrame;
    constructor(container: HTMLBodyElement, controlOptions: ControlOptions, onChange?: EventListener_2, logger?: LogProvider);
    send: (messageEvent: TargetedMessageEvent) => Promise<SuccessResponse | ErrorResponse<EventMessageValues> | DataResponse<EventMessageValues>>;
    controlFrameMessageListener: (event: MessageEvent<EmbeddingEvents>) => void;
    private sendAcknowledgment;
    private getControlExperienceId;
    private getControlExperienceBaseUrl;
    private isMessageEvent;
}

export declare class ControlExperienceFrame extends BaseExperienceFrame<object, BaseContentOptions, InternalControlExperience> {
    constructor(frameOptions: FrameOptions, controlOptions: ControlOptions, contentOptions: BaseContentOptions, transformedContentOptions: object, internalExperience: InternalControlExperience, experienceIdentifier: string, interceptMessage?: EventListener_2);
    buildExperienceUrl: (baseUrl: string) => string;
}

export declare type ControlOptions = {
    eventManager: EventManager;
    contextId: string;
    areCookiesDisabled?: boolean;
    urlInfo: UrlInfo;
    timeout?: number;
    sendToControlFrame?: (messageEvent: TargetedMessageEvent) => Promise<SuccessResponse | ErrorResponse | DataResponse>;
    onChange?: EventListener;
};

export declare const createEmbeddingContext: (frameOptions?: EmbeddingContextFrameOptions) => Promise<EmbeddingContext>;

export declare type CreatePostRequestOptions = {
    src: string;
    container: HTMLElement;
    target: string;
    payload: {
        [key: string]: string;
    };
};

export declare interface DashboardContentOptions extends BaseContentOptions {
    parameters?: Parameter[];
    locale?: string;
    attributionOptions?: AttributionOptions;
    toolbarOptions?: ToolbarOptions;
    sheetOptions?: SheetOptions;
    themeOptions?: ThemeOptions;
    viewId?: string;
}

export declare class DashboardExperience extends BaseExperience<DashboardContentOptions, InternalDashboardExperience, IDashboardExperience, TransformedDashboardContentOptions, DashboardExperienceFrame> {
    protected readonly experience: IDashboardExperience;
    protected readonly internalExperience: InternalDashboardExperience;
    protected readonly experienceFrame: DashboardExperienceFrame;
    protected readonly experienceId: string;
    constructor(frameOptions: FrameOptions, contentOptions: DashboardContentOptions, controlOptions: ControlOptions, experienceIdentifiers: Set<string>);
    initiatePrint: () => Promise<ResponseMessage>;
    undo: () => Promise<ResponseMessage>;
    redo: () => Promise<ResponseMessage>;
    toggleBookmarksPane: () => Promise<ResponseMessage>;
    getParameters: () => Promise<Parameter[]>;
    getSheets: () => Promise<Sheet[]>;
    addFilterGroups: (filterGroups: FilterGroup[]) => Promise<ResponseMessage>;
    updateFilterGroups: (filterGroups: FilterGroup[]) => Promise<ResponseMessage>;
    removeFilterGroups: (filterGroups: FilterGroup[] | string[]) => Promise<ResponseMessage>;
    getFilterGroupsForSheet: (sheetId: string) => Promise<FilterGroup[]>;
    getFilterGroupsForVisual: (sheetId: string, visualId: string) => Promise<FilterGroup[]>;
    getVisualActions: (sheetId: string, visualId: string) => Promise<VisualAction[]>;
    addVisualActions: (sheetId: string, visualId: string, actions: VisualAction[]) => Promise<ResponseMessage>;
    setVisualActions: (sheetId: string, visualId: string, actions: VisualAction[]) => Promise<ResponseMessage>;
    getSelectedSheetId: () => Promise<string>;
    setSelectedSheetId: (sheetId: string) => Promise<ResponseMessage>;
    setTheme: (themeArn: string) => Promise<ResponseMessage>;
    navigateToDashboard: (dashboardId: string, navigateToDashboardOptions?: NavigateToDashboardOptions) => Promise<ResponseMessage>;
    removeVisualActions: (sheetId: string, visualId: string, actions: VisualAction[]) => Promise<ResponseMessage>;
    getSheetVisuals: (sheetId: string) => Promise<Visual[]>;
    setParameters: (parameters: Parameter[]) => Promise<ResponseMessage>;
    reset: () => Promise<ResponseMessage>;
    setThemeOverride: (themeOverride: ThemeConfiguration) => Promise<ResponseMessage>;
    setPreloadThemes: (preloadThemes: string[]) => Promise<ResponseMessage>;
    createSharedView: () => Promise<ResponseMessage>;
    protected extractExperienceFromUrl: (url: string) => IDashboardExperience;
    private interceptMessage;
    private transformDashboardContentOptions;
}

export declare class DashboardExperienceFrame extends BaseExperienceFrame<DashboardContentOptions, TransformedDashboardContentOptions, InternalDashboardExperience> {
    constructor(frameOptions: FrameOptions, controlOptions: ControlOptions, contentOptions: DashboardContentOptions, transformedContentOptions: TransformedDashboardContentOptions, internalExperience: InternalDashboardExperience, experienceIdentifier: string, interceptMessage?: EventListener_2);
    buildExperienceUrl: (baseUrl: string) => string;
}

export declare interface Datapoint {
    FormattedValues: DatapointFormattedValue[];
    RawValues: DatapointRawValue[];
    Columns: DatapointColumn[];
    SelectedColumnIndex?: number;
}

export declare interface DatapointColumn {
    Metric?: MetricColumn;
    Field?: FieldColumn;
}

export declare interface DatapointFormattedValue {
    Value: string;
    Special?: keyof typeof SPECIAL_DATAPOINT_VALUE_TYPES;
}

export declare interface DatapointRawValue {
    String?: string;
    Integer?: number;
    Decimal?: number;
    Date?: Date;
    Bin?: BinDatapointRawValue;
}

export declare class DataResponse<EventMessageValue extends EventMessageValues = EventMessageValues> implements ResponseMessage<EventMessageValue> {
    success: boolean;
    message?: EventMessageValue;
    constructor(message?: EventMessageValue);
}

/**
 * Temporary abstraction for customer provided logger
 *
 */
export declare class DefaultLogger implements LogProvider {
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    debug: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
}

/**
 * The embedding context creates an additional zero-pixel iframe and appends it into the body element on the page to centralize communication between the SDK and the embedded QuickSight content
 */
export declare class EmbeddingContext implements IEmbeddingContext {
    private readonly experienceIdentifiers;
    private readonly eventManager;
    private readonly contextId;
    private readonly contextOnChange;
    private controlOptions?;
    private readonly logger;
    constructor(contextFrameOptions: EmbeddingContextFrameOptions);
    embedVisual: (frameOptions: FrameOptions, contentOptions?: VisualContentOptions) => Promise<VisualExperience>;
    embedDashboard: (frameOptions: FrameOptions, contentOptions?: DashboardContentOptions) => Promise<DashboardExperience>;
    embedConsole: (frameOptions: FrameOptions, contentOptions?: ConsoleContentOptions) => Promise<ConsoleExperience>;
    embedQSearchBar: (frameOptions: FrameOptions, contentOptions?: QSearchContentOptions) => Promise<QSearchExperience>;
    embedGenerativeQnA: (frameOptions: FrameOptions, contentOptions?: GenerativeQnAContentOptions) => Promise<GenerativeQnAExperience>;
    private validateFrameOptions;
    private buildControlOptions;
    private onChange;
    private getControlUrlInfo;
    private getBodyElement;
}

export declare type EmbeddingContextFrameOptions = {
    onChange?: EventListener_2;
};

export declare abstract class EmbeddingEvent<EventName extends EventNames = EventNames, EventMessageValue extends EventMessageValues = EventMessageValues> {
    eventName: EventName;
    message?: EventMessageValue;
    data?: EventData;
    eventTarget?: InternalExperiences;
    protected constructor(eventName: EventName, message?: EventMessageValue, data?: EventData);
}

export declare type EmbeddingEvents = ChangeMessageEvents | GetterMessageEvents | SetterMessageEvents | InfoMessageEvents | InvokerMessageEvents;

export declare interface EmbeddingIFrameElement extends HTMLIFrameElement {
    loading: string;
}

export declare class EmbeddingMessageEvent<EventName extends MessageEventName, EventMessageValue extends EventMessageValues = EventMessageValues> extends EmbeddingEvent<EventName, EventMessageValue> {
    eventName: EventName;
    constructor(eventName: EventName, message?: EventMessageValue, data?: EventData);
}

export declare const ErrorChangeEventName: {
    readonly FRAME_NOT_CREATED: "FRAME_NOT_CREATED";
    readonly NO_BODY: "NO_BODY";
    readonly NO_CONTAINER: "NO_CONTAINER";
    readonly INVALID_CONTAINER: "INVALID_CONTAINER";
    readonly NO_URL: "NO_URL";
    readonly INVALID_URL: "INVALID_URL";
    readonly NO_FRAME_OPTIONS: "NO_FRAME_OPTIONS";
    readonly INVALID_FRAME_OPTIONS: "INVALID_FRAME_OPTIONS";
};

export declare type ErrorChangeEventName = (typeof ErrorChangeEventName)[keyof typeof ErrorChangeEventName];

export declare class ErrorResponse<EventMessageValue extends EventMessageValues = EventMessageValues> implements ResponseMessage<EventMessageValue> {
    success: boolean;
    error?: string;
    message?: EventMessageValue;
    errorCode: string;
    constructor(errorResponse: ErrorResponse);
}

export declare type EventData = Record<string, string | number | string[] | InternalExperiences | {
    frame?: EmbeddingIFrameElement;
} | unknown>;

declare type EventListener_2 = (event: EmbeddingEvents, metadata?: ExperienceFrameMetadata) => void;
export { EventListener_2 as EventListener }

/**
 * Manages the event listeners for the experiences within an embedding context
 */
export declare class EventManager {
    private eventListeners;
    private cleanUpCallbacks;
    constructor();
    addEventListener: (experienceId: ExperienceIdentifier, listener: EventListener_2, cleanUp?: boolean) => this;
    invokeEventListener: (experienceId: ExperienceIdentifier, event: EmbeddingEvents) => this;
    removeEventListener: (experienceId: ExperienceIdentifier, listener: EventListener_2) => this;
    addEventListenerForCleanup: (experienceId: ExperienceIdentifier, cleanupCallback: CleanUpCallback) => void;
    cleanUpCallbacksForExperience: (experienceId: ExperienceIdentifier) => void;
}

export declare type EventMessageValues = string | string[] | {
    height?: string;
} | Visual[] | number | EmbeddingIFrameElement | InternalExperiences | Record<string, unknown> | Parameter[] | VisualAction[] | FilterGroup[] | Sheet[] | undefined | {
    success?: boolean;
} | ThemeConfiguration;

export declare type EventNames = MessageEventName | ChangeEventName;

export declare type ExperienceFrameMetadata = {
    frame: EmbeddingIFrameElement | null;
};

export declare type ExperienceIdentifier = string;

export declare type Experiences = IConsoleExperience | IContextExperience | IControlExperience | IVisualExperience | IDashboardExperience | IQSearchExperience | IGenerativeQnAExperience;

export declare const ExperienceType: {
    readonly CONSOLE: "CONSOLE";
    readonly CONTEXT: "CONTEXT";
    readonly CONTROL: "CONTROL";
    readonly VISUAL: "VISUAL";
    readonly DASHBOARD: "DASHBOARD";
    readonly QSEARCH: "QSEARCH";
    readonly GENERATIVEQNA: "QSEARCH";
};

export declare type ExperienceType = (typeof ExperienceType)[keyof typeof ExperienceType];

export declare interface ExportToolbarOption extends ToolbarOption {
    print?: boolean;
}

export declare interface FieldColumn {
    Integer?: {
        Column: ColumnIdentifier;
    };
    Decimal?: {
        Column: ColumnIdentifier;
    };
    String?: {
        Column: ColumnIdentifier;
    };
    DateTime?: {
        Column: ColumnIdentifier;
        TimeGranularity: DateDimensionField['DateGranularity'];
    };
}

export declare type FrameOptions = {
    url: string;
    container: string | HTMLElement;
    width?: string;
    height?: string;
    resizeHeightOnSizeChangedEvent?: boolean;
    withIframePlaceholder?: boolean | HTMLElement;
    className?: string;
    origin_url?: string;
    onChange?: EventListener_2;
};

export declare type FrameStyles = {
    position: string;
    top: string;
    left: string;
    zIndex: string;
    width: string;
    height: string;
};

export declare interface GenerativeQnAContentOptions extends BaseContentOptions {
    showTopicName?: boolean;
    showPinboard?: boolean;
    allowTopicSelection?: boolean;
    allowFullscreen?: boolean;
    searchPlaceholderText?: string;
    panelOptions?: GenerativeQnAPanelOptions;
    themeOptions?: QThemeOptions;
}

export declare class GenerativeQnAExperience extends InternalQBaseExperience<GenerativeQnAContentOptions, InternalGenerativeQnAExperience, IGenerativeQnAExperience, TransformedGenerativeQnAContentOptions, GenerativeQnAExperienceFrame> {
    protected experience: IGenerativeQnAExperience;
    protected internalExperience: InternalGenerativeQnAExperience;
    protected experienceFrame: GenerativeQnAExperienceFrame;
    protected experienceId: string;
    protected frameStyles?: FrameStyles;
    static readonly TEXT_PROPERTY_MAX_LENGTH = 200;
    constructor(frameOptions: FrameOptions, contentOptions: GenerativeQnAContentOptions, controlOptions: ControlOptions, experienceIdentifiers: Set<string>);
    protected extractExperienceFromUrl: (url: string) => IGenerativeQnAExperience;
    private interceptMessage;
    private transformGenerativeQnAContentOptions;
    private checkMaxLength;
}

export declare class GenerativeQnAExperienceFrame extends BaseExperienceFrame<GenerativeQnAContentOptions, TransformedGenerativeQnAContentOptions, InternalGenerativeQnAExperience> {
    constructor(frameOptions: FrameOptions, controlOptions: ControlOptions, contentOptions: GenerativeQnAContentOptions, transformedContentOptions: TransformedGenerativeQnAContentOptions, internalExperience: InternalGenerativeQnAExperience, experienceIdentifier: string, interceptMessage?: EventListener_2);
    buildExperienceUrl: (baseUrl: string) => string;
}

export declare type GenerativeQnAFullPanelOptions = {
    panelType: typeof GenerativeQnAPanelType.FULL;
    title?: string;
    showQIcon?: boolean;
};

export declare type GenerativeQnAPanelOptions = GenerativeQnAFullPanelOptions | GenerativeQnASearchBarOptions;

export declare const GenerativeQnAPanelType: {
    readonly FULL: "FULL";
    readonly SEARCH_BAR: "SEARCH_BAR";
};

export declare type GenerativeQnASearchBarOptions = {
    panelType: typeof GenerativeQnAPanelType.SEARCH_BAR;
    focusedHeight?: string;
    expandedHeight?: string;
};

export declare const GetterMessageEventName: {
    readonly GET_PARAMETERS: "GET_PARAMETERS";
    readonly GET_SHEETS: "GET_SHEETS";
    readonly GET_SHEET_VISUALS: "GET_SHEET_VISUALS";
    readonly GET_VISUAL_ACTIONS: "GET_VISUAL_ACTIONS";
    readonly GET_SELECTED_SHEET_ID: "GET_SELECTED_SHEET_ID";
    readonly GET_FILTER_GROUPS_FOR_SHEET: "GET_FILTER_GROUPS_FOR_SHEET";
    readonly GET_FILTER_GROUPS_FOR_VISUAL: "GET_FILTER_GROUPS_FOR_VISUAL";
};

export declare type GetterMessageEventName = (typeof GetterMessageEventName)[keyof typeof GetterMessageEventName];

export declare type GetterMessageEvents = EmbeddingEvent<typeof GetterMessageEventName.GET_PARAMETERS, Parameter[]> | EmbeddingEvent<typeof GetterMessageEventName.GET_SHEETS, Sheet[]> | EmbeddingEvent<typeof GetterMessageEventName.GET_SHEET_VISUALS, Visual[]> | EmbeddingEvent<typeof GetterMessageEventName.GET_VISUAL_ACTIONS, VisualAction[]> | EmbeddingEvent<typeof GetterMessageEventName.GET_SELECTED_SHEET_ID, string> | EmbeddingEvent<typeof GetterMessageEventName.GET_FILTER_GROUPS_FOR_SHEET, FilterGroup[]> | EmbeddingEvent<typeof GetterMessageEventName.GET_FILTER_GROUPS_FOR_VISUAL, FilterGroup[]>;

export declare interface IBaseExperience {
    experienceType: ExperienceType;
    discriminator?: number;
}

export declare interface IConsoleExperience extends IBaseExperience {
    experienceType: typeof ExperienceType.CONSOLE;
}

export declare interface IContextExperience extends IBaseExperience {
    experienceType: typeof ExperienceType.CONTEXT;
}

export declare interface IControlExperience extends IBaseExperience {
    experienceType: typeof ExperienceType.CONTROL;
}

export declare interface IDashboardExperience extends IBaseExperience {
    experienceType: typeof ExperienceType.DASHBOARD;
    dashboardId: string;
}

export declare type IEmbeddingContext = {
    embedDashboard: (frameOptions: FrameOptions, contentOptions?: DashboardContentOptions) => Promise<DashboardExperience>;
    embedVisual: (frameOptions: FrameOptions, contentOptions?: VisualContentOptions) => Promise<VisualExperience>;
    embedQSearchBar: (frameOptions: FrameOptions, contentOptions?: QSearchContentOptions) => Promise<QSearchExperience>;
    embedConsole: (frameOptions: FrameOptions, contentOptions?: ConsoleContentOptions) => Promise<ConsoleExperience>;
};

export declare class Iframe {
    static IFRAME_CLASS_NAME: string;
    private readonly iframeName;
    private readonly width;
    private readonly height;
    private readonly loading;
    private readonly container;
    private readonly payload;
    private readonly src;
    private readonly onLoad;
    private readonly iframe;
    private iframePlaceholder?;
    private classNames;
    private postRequest?;
    constructor(options: IframeOptions);
    getIframe: () => EmbeddingIFrameElement;
    private createIframePlaceholder;
    private createIframe;
    private onLoadLocal;
    private createPostRequest;
    private createSvgElement;
    private createLoaderSVG;
}

export declare type IframeOptions = {
    id: string;
    src: string;
    container: HTMLElement;
    width?: string;
    height?: string;
    onLoad?: (event: Event) => void;
    loading?: 'eager' | 'lazy';
    withIframePlaceholder?: boolean | HTMLElement;
    payload?: {
        [key: string]: string;
    };
    className?: string;
};

export declare interface IGenerativeQnAExperience extends IBaseExperience {
    experienceType: typeof ExperienceType.GENERATIVEQNA;
}

export declare const InfoChangeEventName: {
    readonly FRAME_STARTED: "FRAME_STARTED";
    readonly FRAME_MOUNTED: "FRAME_MOUNTED";
    readonly FRAME_LOADED: "FRAME_LOADED";
    readonly FRAME_REMOVED: "FRAME_REMOVED";
};

export declare type InfoChangeEventName = (typeof InfoChangeEventName)[keyof typeof InfoChangeEventName];

export declare const InfoMessageEventName: {
    readonly CALLBACK_OPERATION_INVOKED: "CALLBACK_OPERATION_INVOKED";
    readonly CONTENT_LOADED: "CONTENT_LOADED";
    readonly EXPERIENCE_INITIALIZED: "EXPERIENCE_INITIALIZED";
    readonly ERROR_OCCURRED: "ERROR_OCCURRED";
    readonly SIZE_CHANGED: "SIZE_CHANGED";
    readonly PARAMETERS_CHANGED: "PARAMETERS_CHANGED";
    readonly SELECTED_SHEET_CHANGED: "SELECTED_SHEET_CHANGED";
    readonly MODAL_OPENED: "MODAL_OPENED";
    readonly Q_SEARCH_CLOSED: "Q_SEARCH_CLOSED";
    readonly Q_SEARCH_OPENED: "Q_SEARCH_OPENED";
    readonly Q_SEARCH_FOCUSED: "Q_SEARCH_FOCUSED";
    readonly Q_SEARCH_SIZE_CHANGED: "Q_SEARCH_SIZE_CHANGED";
    readonly Q_SEARCH_ENTERED_FULLSCREEN: "Q_SEARCH_ENTERED_FULLSCREEN";
    readonly Q_SEARCH_EXITED_FULLSCREEN: "Q_SEARCH_EXITED_FULLSCREEN";
    readonly Q_PANEL_ENTERED_FULLSCREEN: "Q_PANEL_ENTERED_FULLSCREEN";
    readonly Q_PANEL_EXITED_FULLSCREEN: "Q_PANEL_EXITED_FULLSCREEN";
    readonly PAGE_NAVIGATION: "PAGE_NAVIGATION";
};

export declare type InfoMessageEventName = (typeof InfoMessageEventName)[keyof typeof InfoMessageEventName];

export declare type InfoMessageEvents = EmbeddingEvent<typeof InfoMessageEventName.CONTENT_LOADED, {
    title?: string;
}> | EmbeddingEvent<typeof InfoMessageEventName.CALLBACK_OPERATION_INVOKED, {
    CustomActionId: string;
    DashboardId: string;
    VisualId: string;
    SheetId: string;
    Datapoints: Datapoint[];
}> | EmbeddingEvent<typeof InfoMessageEventName.SIZE_CHANGED, {
    height?: string;
    width?: string;
}> | TargetedMessageEvent<typeof InfoMessageEventName.EXPERIENCE_INITIALIZED, object> | EmbeddingEvent<typeof InfoMessageEventName.ERROR_OCCURRED, {
    errorCode?: string;
}> | EmbeddingEvent<typeof InfoMessageEventName.MODAL_OPENED, undefined> | EmbeddingEvent<typeof InfoMessageEventName.PARAMETERS_CHANGED, {
    changedParameters: Parameter[];
}> | EmbeddingEvent<typeof InfoMessageEventName.SELECTED_SHEET_CHANGED, {
    selectedSheet: {
        Name?: string;
        SheetId: string;
    };
}> | EmbeddingEvent<typeof InfoMessageEventName.Q_SEARCH_CLOSED, {
    height?: string;
}> | EmbeddingEvent<typeof InfoMessageEventName.Q_SEARCH_OPENED, {
    height?: string;
}> | EmbeddingEvent<typeof InfoMessageEventName.Q_SEARCH_FOCUSED, {
    height?: string;
}> | EmbeddingEvent<typeof InfoMessageEventName.Q_SEARCH_SIZE_CHANGED, {
    height?: number;
}> | EmbeddingEvent<typeof InfoMessageEventName.Q_SEARCH_ENTERED_FULLSCREEN, undefined> | EmbeddingEvent<typeof InfoMessageEventName.Q_SEARCH_EXITED_FULLSCREEN, undefined> | EmbeddingEvent<typeof InfoMessageEventName.Q_PANEL_ENTERED_FULLSCREEN, undefined> | EmbeddingEvent<typeof InfoMessageEventName.Q_PANEL_EXITED_FULLSCREEN, undefined> | EmbeddingEvent<typeof InfoMessageEventName.PAGE_NAVIGATION, {
    pageType?: string;
}>;

export declare interface InternalConsoleExperience extends IConsoleExperience {
    contextId: string;
}

export declare interface InternalContextExperience extends IContextExperience {
    contextId: string;
}

export declare interface InternalControlExperience extends IControlExperience {
    contextId: string;
}

export declare interface InternalDashboardExperience extends IDashboardExperience {
    contextId: string;
}

export declare interface InternalExperienceInfo<InternalExperience extends InternalExperiences> {
    experienceIdentifier: string;
    internalExperience: InternalExperience;
}

export declare type InternalExperiences = InternalConsoleExperience | InternalContextExperience | InternalControlExperience | InternalVisualExperience | InternalDashboardExperience | InternalQSearchExperience | InternalGenerativeQnAExperience;

export declare interface InternalGenerativeQnAExperience extends IGenerativeQnAExperience {
    contextId: string;
}

/**
 * Internal base experience for embedded Q,
 * containing shared functionality between q-search-bar and generative-qna experience types.
 */
export declare abstract class InternalQBaseExperience<ExperienceContentOptions extends ContentOptions, InternalExperience extends InternalExperiences, Experience extends Experiences, TransformedExperienceContentOptions extends TransformedContentOptions, ExperienceFrame extends BaseExperienceFrame<ExperienceContentOptions, TransformedExperienceContentOptions, InternalExperience>> extends BaseExperience<ExperienceContentOptions, InternalExperience, Experience, TransformedExperienceContentOptions, ExperienceFrame> {
    static readonly MAX_Z_INDEX = "2147483647";
    protected frameStyles?: FrameStyles;
    close: () => Promise<ResponseMessage>;
    setQuestion: (question: string) => Promise<ResponseMessage>;
    protected trackOutsideClicks: () => void;
    protected enterFullScreen: (metadata: ExperienceFrameMetadata | undefined) => void;
    protected exitFullScreen: (metadata: ExperienceFrameMetadata | undefined) => void;
}

export declare interface InternalQSearchExperience extends IQSearchExperience {
    contextId: string;
}

export declare interface InternalVisualExperience extends IVisualExperience {
    contextId: string;
}

export declare const InvokerMessageEventName: {
    readonly ACKNOWLEDGE: "ACKNOWLEDGE";
    readonly INITIATE_PRINT: "INITIATE_PRINT";
    readonly NAVIGATE_TO_DASHBOARD: "NAVIGATE_TO_DASHBOARD";
    readonly CLOSE_Q_SEARCH: "CLOSE_Q_SEARCH";
    readonly UNDO: "UNDO";
    readonly REDO: "REDO";
    readonly RESET: "RESET";
    readonly TOGGLE_BOOKMARKS_PANE: "TOGGLE_BOOKMARKS_PANE";
};

export declare type InvokerMessageEventName = (typeof InvokerMessageEventName)[keyof typeof InvokerMessageEventName];

export declare type InvokerMessageEvents = TargetedMessageEvent<typeof InvokerMessageEventName.ACKNOWLEDGE, {
    eventName: string;
    eventTarget?: InternalExperiences;
}> | EmbeddingMessageEvent<typeof InvokerMessageEventName.INITIATE_PRINT, SuccessResponse | ErrorResponse> | EmbeddingMessageEvent<typeof InvokerMessageEventName.NAVIGATE_TO_DASHBOARD, SuccessResponse | ErrorResponse> | EmbeddingMessageEvent<typeof InvokerMessageEventName.CLOSE_Q_SEARCH, SuccessResponse | ErrorResponse> | EmbeddingMessageEvent<typeof InvokerMessageEventName.UNDO, SuccessResponse | ErrorResponse> | EmbeddingMessageEvent<typeof InvokerMessageEventName.REDO, SuccessResponse | ErrorResponse> | EmbeddingMessageEvent<typeof InvokerMessageEventName.RESET, SuccessResponse | ErrorResponse> | EmbeddingMessageEvent<typeof InvokerMessageEventName.TOGGLE_BOOKMARKS_PANE, SuccessResponse | ErrorResponse>;

export declare interface IQSearchExperience extends IBaseExperience {
    experienceType: typeof ExperienceType.QSEARCH;
}

export declare interface IVisualExperience extends IBaseExperience {
    experienceType: typeof ExperienceType.VISUAL;
    dashboardId: string;
    sheetId: string;
    visualId: string;
}

export declare interface LogProvider {
    log: typeof console.log;
    warn: typeof console.warn;
    error: typeof console.error;
    debug: typeof console.debug;
    info: typeof console.info;
}

export declare const MessageEventName: {
    readonly ACKNOWLEDGE: "ACKNOWLEDGE";
    readonly INITIATE_PRINT: "INITIATE_PRINT";
    readonly NAVIGATE_TO_DASHBOARD: "NAVIGATE_TO_DASHBOARD";
    readonly CLOSE_Q_SEARCH: "CLOSE_Q_SEARCH";
    readonly UNDO: "UNDO";
    readonly REDO: "REDO";
    readonly RESET: "RESET";
    readonly TOGGLE_BOOKMARKS_PANE: "TOGGLE_BOOKMARKS_PANE";
    readonly GET_PARAMETERS: "GET_PARAMETERS";
    readonly GET_SHEETS: "GET_SHEETS";
    readonly GET_SHEET_VISUALS: "GET_SHEET_VISUALS";
    readonly GET_VISUAL_ACTIONS: "GET_VISUAL_ACTIONS";
    readonly GET_SELECTED_SHEET_ID: "GET_SELECTED_SHEET_ID";
    readonly GET_FILTER_GROUPS_FOR_SHEET: "GET_FILTER_GROUPS_FOR_SHEET";
    readonly GET_FILTER_GROUPS_FOR_VISUAL: "GET_FILTER_GROUPS_FOR_VISUAL";
    readonly SET_PARAMETERS: "SET_PARAMETERS";
    readonly SET_SELECTED_SHEET_ID: "SET_SELECTED_SHEET_ID";
    readonly SET_Q_SEARCH_QUESTION: "SET_Q_SEARCH_QUESTION";
    readonly SET_VISUAL_ACTIONS: "SET_VISUAL_ACTIONS";
    readonly SET_THEME: "SET_THEME";
    readonly ADD_FILTER_GROUPS: "ADD_FILTER_GROUPS";
    readonly UPDATE_FILTER_GROUPS: "UPDATE_FILTER_GROUPS";
    readonly REMOVE_FILTER_GROUPS: "REMOVE_FILTER_GROUPS";
    readonly ADD_VISUAL_ACTIONS: "ADD_VISUAL_ACTIONS";
    readonly REMOVE_VISUAL_ACTIONS: "REMOVE_VISUAL_ACTIONS";
    readonly SET_THEME_OVERRIDE: "SET_THEME_OVERRIDE";
    readonly PRELOAD_THEMES: "PRELOAD_THEMES";
    readonly CREATE_SHARED_VIEW: "CREATE_SHARED_VIEW";
    readonly CALLBACK_OPERATION_INVOKED: "CALLBACK_OPERATION_INVOKED";
    readonly CONTENT_LOADED: "CONTENT_LOADED";
    readonly EXPERIENCE_INITIALIZED: "EXPERIENCE_INITIALIZED";
    readonly ERROR_OCCURRED: "ERROR_OCCURRED";
    readonly SIZE_CHANGED: "SIZE_CHANGED";
    readonly PARAMETERS_CHANGED: "PARAMETERS_CHANGED";
    readonly SELECTED_SHEET_CHANGED: "SELECTED_SHEET_CHANGED";
    readonly MODAL_OPENED: "MODAL_OPENED";
    readonly Q_SEARCH_CLOSED: "Q_SEARCH_CLOSED";
    readonly Q_SEARCH_OPENED: "Q_SEARCH_OPENED";
    readonly Q_SEARCH_FOCUSED: "Q_SEARCH_FOCUSED";
    readonly Q_SEARCH_SIZE_CHANGED: "Q_SEARCH_SIZE_CHANGED";
    readonly Q_SEARCH_ENTERED_FULLSCREEN: "Q_SEARCH_ENTERED_FULLSCREEN";
    readonly Q_SEARCH_EXITED_FULLSCREEN: "Q_SEARCH_EXITED_FULLSCREEN";
    readonly Q_PANEL_ENTERED_FULLSCREEN: "Q_PANEL_ENTERED_FULLSCREEN";
    readonly Q_PANEL_EXITED_FULLSCREEN: "Q_PANEL_EXITED_FULLSCREEN";
    readonly PAGE_NAVIGATION: "PAGE_NAVIGATION";
};

export declare type MessageEventName = (typeof MessageEventName)[keyof typeof MessageEventName];

export declare interface MetricColumn {
    Integer?: {
        Column: ColumnIdentifier;
        AggregationFunction?: AggregationFunction['NumericalAggregationFunction'];
    };
    Decimal?: {
        Column: ColumnIdentifier;
        AggregationFunction?: AggregationFunction['NumericalAggregationFunction'];
    };
    String?: {
        Column: ColumnIdentifier;
        AggregationFunction?: AggregationFunction['CategoricalAggregationFunction'];
    };
    DateTime?: {
        Column: ColumnIdentifier;
        AggregationFunction?: AggregationFunction['DateAggregationFunction'];
    };
    Calculated?: {
        Column: ColumnIdentifier;
        Expression: string;
        Type: keyof typeof CALCULATED_METRIC_COLUMN_TYPE;
    };
    Bin?: {
        Column: ColumnIdentifier;
    };
}

export declare type NavigateToDashboardOptions = {
    parameters?: Parameter[];
};

export declare interface Parameter {
    Name: string;
    Values: ParameterValue[];
}

export declare type ParametersAsObject = Record<string, Primitives | Primitives[]>;

export declare type ParameterValue = string | number;

export declare class PostMessageEvent<EventName extends MessageEventName = MessageEventName, EventMessageValue extends EventMessageValues = EventMessageValues> extends TargetedMessageEvent<EventName, EventMessageValue> {
    timestamp: number;
    version: string;
    eventId: string;
    constructor(eventName: EventName, eventTarget: InternalExperiences, eventId: string, timestamp: number, version: string, message?: EventMessageValue, data?: EventData);
}

export declare type PostRequest = {
    remove: () => void;
};

export declare type Primitives = string | number | boolean;

/**
 * Namespaces enums under one import for convenience
 *
 * @deprecated - Enums can be imported directly
 */
export declare const QSE: {
    GenerativeQnAPanelType: {
        readonly FULL: "FULL";
        readonly SEARCH_BAR: "SEARCH_BAR";
    };
    SPECIAL_DATAPOINT_VALUE_TYPES: {
        readonly NULL: null;
        readonly OTHER_BUCKET: null;
    };
    CALCULATED_METRIC_COLUMN_TYPE: {
        readonly INTEGER: null;
        readonly STRING: null;
        readonly DECIMAL: null;
        readonly DATETIME: null;
    };
    ExperienceType: {
        readonly CONSOLE: "CONSOLE";
        readonly CONTEXT: "CONTEXT";
        readonly CONTROL: "CONTROL";
        readonly VISUAL: "VISUAL";
        readonly DASHBOARD: "DASHBOARD";
        readonly QSEARCH: "QSEARCH";
        readonly GENERATIVEQNA: "QSEARCH";
    };
    ChangeEventName: {
        readonly UNRECOGNIZED_CONTENT_OPTIONS: "UNRECOGNIZED_CONTENT_OPTIONS";
        readonly UNRECOGNIZED_FRAME_OPTIONS: "UNRECOGNIZED_FRAME_OPTIONS";
        readonly UNRECOGNIZED_EVENT_TARGET: "UNRECOGNIZED_EVENT_TARGET";
        readonly FRAME_NOT_CREATED: "FRAME_NOT_CREATED";
        readonly NO_BODY: "NO_BODY";
        readonly NO_CONTAINER: "NO_CONTAINER";
        readonly INVALID_CONTAINER: "INVALID_CONTAINER";
        readonly NO_URL: "NO_URL";
        readonly INVALID_URL: "INVALID_URL";
        readonly NO_FRAME_OPTIONS: "NO_FRAME_OPTIONS";
        readonly INVALID_FRAME_OPTIONS: "INVALID_FRAME_OPTIONS";
        readonly FRAME_STARTED: "FRAME_STARTED";
        readonly FRAME_MOUNTED: "FRAME_MOUNTED";
        readonly FRAME_LOADED: "FRAME_LOADED";
        readonly FRAME_REMOVED: "FRAME_REMOVED";
    };
    MessageEventName: {
        readonly ACKNOWLEDGE: "ACKNOWLEDGE";
        readonly INITIATE_PRINT: "INITIATE_PRINT";
        readonly NAVIGATE_TO_DASHBOARD: "NAVIGATE_TO_DASHBOARD";
        readonly CLOSE_Q_SEARCH: "CLOSE_Q_SEARCH";
        readonly UNDO: "UNDO";
        readonly REDO: "REDO";
        readonly RESET: "RESET";
        readonly TOGGLE_BOOKMARKS_PANE: "TOGGLE_BOOKMARKS_PANE";
        readonly GET_PARAMETERS: "GET_PARAMETERS";
        readonly GET_SHEETS: "GET_SHEETS";
        readonly GET_SHEET_VISUALS: "GET_SHEET_VISUALS";
        readonly GET_VISUAL_ACTIONS: "GET_VISUAL_ACTIONS";
        readonly GET_SELECTED_SHEET_ID: "GET_SELECTED_SHEET_ID";
        readonly GET_FILTER_GROUPS_FOR_SHEET: "GET_FILTER_GROUPS_FOR_SHEET";
        readonly GET_FILTER_GROUPS_FOR_VISUAL: "GET_FILTER_GROUPS_FOR_VISUAL";
        readonly SET_PARAMETERS: "SET_PARAMETERS";
        readonly SET_SELECTED_SHEET_ID: "SET_SELECTED_SHEET_ID";
        readonly SET_Q_SEARCH_QUESTION: "SET_Q_SEARCH_QUESTION";
        readonly SET_VISUAL_ACTIONS: "SET_VISUAL_ACTIONS";
        readonly SET_THEME: "SET_THEME";
        readonly ADD_FILTER_GROUPS: "ADD_FILTER_GROUPS";
        readonly UPDATE_FILTER_GROUPS: "UPDATE_FILTER_GROUPS";
        readonly REMOVE_FILTER_GROUPS: "REMOVE_FILTER_GROUPS";
        readonly ADD_VISUAL_ACTIONS: "ADD_VISUAL_ACTIONS";
        readonly REMOVE_VISUAL_ACTIONS: "REMOVE_VISUAL_ACTIONS";
        readonly SET_THEME_OVERRIDE: "SET_THEME_OVERRIDE";
        readonly PRELOAD_THEMES: "PRELOAD_THEMES";
        readonly CREATE_SHARED_VIEW: "CREATE_SHARED_VIEW";
        readonly CALLBACK_OPERATION_INVOKED: "CALLBACK_OPERATION_INVOKED";
        readonly CONTENT_LOADED: "CONTENT_LOADED";
        readonly EXPERIENCE_INITIALIZED: "EXPERIENCE_INITIALIZED";
        readonly ERROR_OCCURRED: "ERROR_OCCURRED";
        readonly SIZE_CHANGED: "SIZE_CHANGED";
        readonly PARAMETERS_CHANGED: "PARAMETERS_CHANGED";
        readonly SELECTED_SHEET_CHANGED: "SELECTED_SHEET_CHANGED";
        readonly MODAL_OPENED: "MODAL_OPENED";
        readonly Q_SEARCH_CLOSED: "Q_SEARCH_CLOSED";
        readonly Q_SEARCH_OPENED: "Q_SEARCH_OPENED";
        readonly Q_SEARCH_FOCUSED: "Q_SEARCH_FOCUSED";
        readonly Q_SEARCH_SIZE_CHANGED: "Q_SEARCH_SIZE_CHANGED";
        readonly Q_SEARCH_ENTERED_FULLSCREEN: "Q_SEARCH_ENTERED_FULLSCREEN";
        readonly Q_SEARCH_EXITED_FULLSCREEN: "Q_SEARCH_EXITED_FULLSCREEN";
        readonly Q_PANEL_ENTERED_FULLSCREEN: "Q_PANEL_ENTERED_FULLSCREEN";
        readonly Q_PANEL_EXITED_FULLSCREEN: "Q_PANEL_EXITED_FULLSCREEN";
        readonly PAGE_NAVIGATION: "PAGE_NAVIGATION";
    };
    ChangeEventLevel: {
        readonly ERROR: "ERROR";
        readonly INFO: "INFO";
        readonly WARN: "WARN";
    };
    InfoMessageEventName: {
        readonly CALLBACK_OPERATION_INVOKED: "CALLBACK_OPERATION_INVOKED";
        readonly CONTENT_LOADED: "CONTENT_LOADED";
        readonly EXPERIENCE_INITIALIZED: "EXPERIENCE_INITIALIZED";
        readonly ERROR_OCCURRED: "ERROR_OCCURRED";
        readonly SIZE_CHANGED: "SIZE_CHANGED";
        readonly PARAMETERS_CHANGED: "PARAMETERS_CHANGED";
        readonly SELECTED_SHEET_CHANGED: "SELECTED_SHEET_CHANGED";
        readonly MODAL_OPENED: "MODAL_OPENED";
        readonly Q_SEARCH_CLOSED: "Q_SEARCH_CLOSED";
        readonly Q_SEARCH_OPENED: "Q_SEARCH_OPENED";
        readonly Q_SEARCH_FOCUSED: "Q_SEARCH_FOCUSED";
        readonly Q_SEARCH_SIZE_CHANGED: "Q_SEARCH_SIZE_CHANGED";
        readonly Q_SEARCH_ENTERED_FULLSCREEN: "Q_SEARCH_ENTERED_FULLSCREEN";
        readonly Q_SEARCH_EXITED_FULLSCREEN: "Q_SEARCH_EXITED_FULLSCREEN";
        readonly Q_PANEL_ENTERED_FULLSCREEN: "Q_PANEL_ENTERED_FULLSCREEN";
        readonly Q_PANEL_EXITED_FULLSCREEN: "Q_PANEL_EXITED_FULLSCREEN";
        readonly PAGE_NAVIGATION: "PAGE_NAVIGATION";
    };
    InfoChangeEventName: {
        readonly FRAME_STARTED: "FRAME_STARTED";
        readonly FRAME_MOUNTED: "FRAME_MOUNTED";
        readonly FRAME_LOADED: "FRAME_LOADED";
        readonly FRAME_REMOVED: "FRAME_REMOVED";
    };
    ErrorChangeEventName: {
        readonly FRAME_NOT_CREATED: "FRAME_NOT_CREATED";
        readonly NO_BODY: "NO_BODY";
        readonly NO_CONTAINER: "NO_CONTAINER";
        readonly INVALID_CONTAINER: "INVALID_CONTAINER";
        readonly NO_URL: "NO_URL";
        readonly INVALID_URL: "INVALID_URL";
        readonly NO_FRAME_OPTIONS: "NO_FRAME_OPTIONS";
        readonly INVALID_FRAME_OPTIONS: "INVALID_FRAME_OPTIONS";
    };
    WarnChangeEventName: {
        readonly UNRECOGNIZED_CONTENT_OPTIONS: "UNRECOGNIZED_CONTENT_OPTIONS";
        readonly UNRECOGNIZED_FRAME_OPTIONS: "UNRECOGNIZED_FRAME_OPTIONS";
        readonly UNRECOGNIZED_EVENT_TARGET: "UNRECOGNIZED_EVENT_TARGET";
    };
    SetterMessageEventName: {
        readonly SET_PARAMETERS: "SET_PARAMETERS";
        readonly SET_SELECTED_SHEET_ID: "SET_SELECTED_SHEET_ID";
        readonly SET_Q_SEARCH_QUESTION: "SET_Q_SEARCH_QUESTION";
        readonly SET_VISUAL_ACTIONS: "SET_VISUAL_ACTIONS";
        readonly SET_THEME: "SET_THEME";
        readonly ADD_FILTER_GROUPS: "ADD_FILTER_GROUPS";
        readonly UPDATE_FILTER_GROUPS: "UPDATE_FILTER_GROUPS";
        readonly REMOVE_FILTER_GROUPS: "REMOVE_FILTER_GROUPS";
        readonly ADD_VISUAL_ACTIONS: "ADD_VISUAL_ACTIONS";
        readonly REMOVE_VISUAL_ACTIONS: "REMOVE_VISUAL_ACTIONS";
        readonly SET_THEME_OVERRIDE: "SET_THEME_OVERRIDE";
        readonly PRELOAD_THEMES: "PRELOAD_THEMES";
        readonly CREATE_SHARED_VIEW: "CREATE_SHARED_VIEW";
    };
    GetterMessageEventName: {
        readonly GET_PARAMETERS: "GET_PARAMETERS";
        readonly GET_SHEETS: "GET_SHEETS";
        readonly GET_SHEET_VISUALS: "GET_SHEET_VISUALS";
        readonly GET_VISUAL_ACTIONS: "GET_VISUAL_ACTIONS";
        readonly GET_SELECTED_SHEET_ID: "GET_SELECTED_SHEET_ID";
        readonly GET_FILTER_GROUPS_FOR_SHEET: "GET_FILTER_GROUPS_FOR_SHEET";
        readonly GET_FILTER_GROUPS_FOR_VISUAL: "GET_FILTER_GROUPS_FOR_VISUAL";
    };
    InvokerMessageEventName: {
        readonly ACKNOWLEDGE: "ACKNOWLEDGE";
        readonly INITIATE_PRINT: "INITIATE_PRINT";
        readonly NAVIGATE_TO_DASHBOARD: "NAVIGATE_TO_DASHBOARD";
        readonly CLOSE_Q_SEARCH: "CLOSE_Q_SEARCH";
        readonly UNDO: "UNDO";
        readonly REDO: "REDO";
        readonly RESET: "RESET";
        readonly TOGGLE_BOOKMARKS_PANE: "TOGGLE_BOOKMARKS_PANE";
    };
};

export declare interface QSearchContentOptions extends BaseContentOptions {
    hideIcon?: boolean;
    hideTopicName?: boolean;
    theme?: string;
    allowTopicSelection?: boolean;
}

export declare class QSearchExperience extends InternalQBaseExperience<QSearchContentOptions, InternalQSearchExperience, IQSearchExperience, TransformedQSearchContentOptions, QSearchExperienceFrame> {
    protected experience: IQSearchExperience;
    protected internalExperience: InternalQSearchExperience;
    protected experienceFrame: QSearchExperienceFrame;
    protected experienceId: string;
    protected frameStyles?: FrameStyles;
    constructor(frameOptions: FrameOptions, contentOptions: QSearchContentOptions, controlOptions: ControlOptions, experienceIdentifiers: Set<string>);
    protected extractExperienceFromUrl: (url: string) => IQSearchExperience;
    private interceptMessage;
    private transformQSearchContentOptions;
}

export declare class QSearchExperienceFrame extends BaseExperienceFrame<QSearchContentOptions, TransformedQSearchContentOptions, InternalQSearchExperience> {
    constructor(frameOptions: FrameOptions, controlOptions: ControlOptions, contentOptions: QSearchContentOptions, transformedContentOptions: TransformedQSearchContentOptions, internalExperience: InternalQSearchExperience, experienceIdentifier: string, interceptMessage?: EventListener_2);
    buildExperienceUrl: (baseUrl: string) => string;
}

export declare type QThemeOptions = {
    themeArn?: string;
};

export declare abstract class ResponseMessage<EventMessageValue extends EventMessageValues = EventMessageValues> {
    abstract success: boolean;
    message?: EventMessageValue;
}

export declare const SDK_VERSION = "2.8.0";

export declare const SetterMessageEventName: {
    readonly SET_PARAMETERS: "SET_PARAMETERS";
    readonly SET_SELECTED_SHEET_ID: "SET_SELECTED_SHEET_ID";
    readonly SET_Q_SEARCH_QUESTION: "SET_Q_SEARCH_QUESTION";
    readonly SET_VISUAL_ACTIONS: "SET_VISUAL_ACTIONS";
    readonly SET_THEME: "SET_THEME";
    readonly ADD_FILTER_GROUPS: "ADD_FILTER_GROUPS";
    readonly UPDATE_FILTER_GROUPS: "UPDATE_FILTER_GROUPS";
    readonly REMOVE_FILTER_GROUPS: "REMOVE_FILTER_GROUPS";
    readonly ADD_VISUAL_ACTIONS: "ADD_VISUAL_ACTIONS";
    readonly REMOVE_VISUAL_ACTIONS: "REMOVE_VISUAL_ACTIONS";
    readonly SET_THEME_OVERRIDE: "SET_THEME_OVERRIDE";
    readonly PRELOAD_THEMES: "PRELOAD_THEMES";
    readonly CREATE_SHARED_VIEW: "CREATE_SHARED_VIEW";
};

export declare type SetterMessageEventName = (typeof SetterMessageEventName)[keyof typeof SetterMessageEventName];

export declare type SetterMessageEvents = EmbeddingMessageEvent<typeof SetterMessageEventName.SET_PARAMETERS, Parameter[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.REMOVE_VISUAL_ACTIONS, VisualAction[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.ADD_FILTER_GROUPS, FilterGroup[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.UPDATE_FILTER_GROUPS, FilterGroup[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.REMOVE_FILTER_GROUPS, FilterGroup[] | string[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.ADD_VISUAL_ACTIONS, VisualAction[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.SET_THEME, {
    themeArn?: string;
}> | EmbeddingMessageEvent<typeof SetterMessageEventName.SET_VISUAL_ACTIONS, VisualAction[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.SET_Q_SEARCH_QUESTION, {
    question?: string;
}> | EmbeddingMessageEvent<typeof SetterMessageEventName.SET_SELECTED_SHEET_ID, {
    sheetId?: string;
}> | EmbeddingMessageEvent<typeof SetterMessageEventName.PRELOAD_THEMES, string[]> | EmbeddingMessageEvent<typeof SetterMessageEventName.SET_THEME_OVERRIDE, ThemeConfiguration> | EmbeddingMessageEvent<typeof SetterMessageEventName.CREATE_SHARED_VIEW, {
    viewId?: string;
}>;

export declare interface Sheet {
    Name: string;
    SheetId: string;
}

export declare interface SheetOptions {
    initialSheetId?: string;
    singleSheet?: boolean;
    emitSizeChangedEventOnSheetChange?: boolean;
}

export declare const SPECIAL_DATAPOINT_VALUE_TYPES: {
    readonly NULL: null;
    readonly OTHER_BUCKET: null;
};

export declare class SuccessResponse implements ResponseMessage {
    success: boolean;
}

export declare class TargetedMessageEvent<EventName extends MessageEventName = MessageEventName, EventMessageValue extends EventMessageValues = EventMessageValues> extends EmbeddingMessageEvent<EventName, EventMessageValue> {
    eventTarget: InternalExperiences;
    constructor(eventName: EventName, eventTarget: InternalExperiences, message?: EventMessageValue, data?: EventData);
}

export declare type ThemeOptions = {
    themeArn?: string;
    themeOverride?: ThemeConfiguration;
    preloadThemes?: string[];
};

export declare interface ToolbarOption {
    show?: true;
}

export declare interface ToolbarOptions {
    export?: boolean | ExportToolbarOption;
    undoRedo?: boolean | ToolbarOption;
    reset?: boolean | ToolbarOption;
    bookmarks?: boolean | ToolbarOption;
}

export declare type TransformedConsoleContentOptions = ConsoleContentOptions;

export declare type TransformedContentOptions = TransformedConsoleContentOptions | TransformedDashboardContentOptions | TransformedQSearchContentOptions | TransformedVisualContentOptions | TransformedGenerativeQnAContentOptions | object;

export declare interface TransformedDashboardContentOptions extends BaseContentOptions {
    parameters?: ParametersAsObject;
    locale?: string;
    sheetId?: string | undefined;
    footerPaddingEnabled?: boolean;
    undoRedoDisabled?: boolean;
    printEnabled?: boolean;
    showBookmarksIcon?: boolean;
    resetDisabled?: boolean;
    sheetTabsDisabled?: boolean;
    resizeOnSheetChange?: boolean;
    themeArn?: string;
    themeOverride?: ThemeConfiguration;
}

export declare interface TransformedGenerativeQnAContentOptions extends BaseContentOptions {
    qShowTopicName?: boolean;
    qShowPinboard?: boolean;
    qAllowTopicSelection?: boolean;
    qAllowFullscreen?: boolean;
    qSearchPlaceholderText?: string;
    qPanelType?: string;
    qPanelTitle?: string;
    qShowPanelIcon?: boolean;
    qPanelFocusedHeight?: string;
    qPanelExpandedHeight?: string;
    themeArn?: string;
}

export declare interface TransformedQSearchContentOptions extends BaseContentOptions {
    qBarIconDisabled?: boolean;
    qBarTopicNameDisabled?: boolean;
    themeId?: string;
    allowTopicSelection?: boolean;
}

export declare interface TransformedVisualContentOptions extends BaseContentOptions {
    locale?: string;
    fitToIframeWidth?: boolean;
    parameters?: ParametersAsObject;
    themeArn?: string;
    themeOverride?: ThemeConfiguration;
}

export declare type UrlInfo = {
    sessionId: string;
    host: string;
    urlSearchParams?: URLSearchParams;
};

export declare interface Visual {
    Name: string;
    VisualId: string;
}

export declare interface VisualAction extends VisualCustomAction {
    ActionOperations: ActionOperation[];
}

export declare interface VisualContentOptions extends BaseContentOptions {
    locale?: string;
    parameters?: Parameter[];
    fitToIframeWidth?: boolean;
    themeOptions?: ThemeOptions;
}

export declare class VisualExperience extends BaseExperience<VisualContentOptions, InternalVisualExperience, IVisualExperience, TransformedContentOptions, VisualExperienceFrame> {
    protected experience: IVisualExperience;
    protected internalExperience: InternalVisualExperience;
    protected experienceFrame: VisualExperienceFrame;
    protected experienceId: string;
    constructor(frameOptions: FrameOptions, contentOptions: VisualContentOptions, controlOptions: ControlOptions, experienceIdentifiers: Set<string>);
    setParameters: (parameters: Parameter[]) => Promise<ResponseMessage>;
    reset: () => Promise<ResponseMessage>;
    addFilterGroups: (filterGroups: FilterGroup[]) => Promise<ResponseMessage>;
    updateFilterGroups: (filterGroups: FilterGroup[]) => Promise<ResponseMessage>;
    removeFilterGroups: (filterGroups: FilterGroup[] | string[]) => Promise<ResponseMessage>;
    getFilterGroups: () => Promise<FilterGroup[]>;
    getActions: () => Promise<VisualAction[]>;
    addActions: (actions: VisualAction[]) => Promise<ResponseMessage>;
    setActions: (actions: VisualAction[]) => Promise<ResponseMessage>;
    removeActions: (actions: VisualAction[]) => Promise<ResponseMessage>;
    setTheme: (themeArn: string) => Promise<ResponseMessage>;
    setThemeOverride: (themeOverride: ThemeConfiguration) => Promise<ResponseMessage>;
    setPreloadThemes: (preloadThemes: string[]) => Promise<ResponseMessage>;
    protected extractExperienceFromUrl: (url: string) => IVisualExperience;
    private interceptMessage;
    private transformVisualContentOptions;
}

export declare class VisualExperienceFrame extends BaseExperienceFrame<VisualContentOptions, TransformedVisualContentOptions, InternalVisualExperience> {
    constructor(frameOptions: FrameOptions, controlOptions: ControlOptions, contentOptions: VisualContentOptions, transformedContentOptions: TransformedVisualContentOptions, internalExperience: InternalVisualExperience, experienceIdentifier: string, interceptMessage?: EventListener_2);
    buildExperienceUrl: (baseUrl: string) => string;
}

export declare const WarnChangeEventName: {
    readonly UNRECOGNIZED_CONTENT_OPTIONS: "UNRECOGNIZED_CONTENT_OPTIONS";
    readonly UNRECOGNIZED_FRAME_OPTIONS: "UNRECOGNIZED_FRAME_OPTIONS";
    readonly UNRECOGNIZED_EVENT_TARGET: "UNRECOGNIZED_EVENT_TARGET";
};

export declare type WarnChangeEventName = (typeof WarnChangeEventName)[keyof typeof WarnChangeEventName];

export { }
