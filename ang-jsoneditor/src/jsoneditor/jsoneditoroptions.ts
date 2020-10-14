export type JsonEditorMode = 'tree' | 'view' | 'form' | 'text' | 'code' | 'preview';

export type JsonEditorNodePath = Array<string | number>;

export interface JsonEditorNode {
  field: string;
  path: JsonEditorNodePath;
  value: JSON;
}

export interface JsonEditorNodeNameArgs {
  path: JsonEditorNodePath;
  size: number;
  type: 'object' | 'array';
}

export interface JsonEditorValidationError {
  path: JsonEditorNodePath;
  message: string;
}

export interface JsonEditorSeparatorContextMenuItem {
  type: 'separator';
}
export interface JsonEditorButtonContextMenuItem {
  title?: string;
  submenuTitle?: string;
  className: string;
  text: string;
  submenu?: Array<JsonEditorContextMenuItem>;
  click?: () => void;
}
export type JsonEditorContextMenuItem = JsonEditorSeparatorContextMenuItem | JsonEditorButtonContextMenuItem;

export interface JsonEditorContextMenuNode {
  type: 'single' | 'multiple' | 'append';
  path: JsonEditorNodePath;
  paths: Array<JsonEditorNodePath>;
}

export interface JsonEditorTextPosition {
  row: number;
  column: number;
}

export interface JsonEditorSerializableNode {
  value: JSON;
  path: JsonEditorNodePath;
}

export interface JsonEditorQueryOptions {
  filter?: {
    field: string | '@';
    relation: '==' | '!=' | '<' | '<=' | '>' | '>=';
    value: string;
  };
  sort?: {
    field: string | '@';
    direction: 'asc' | 'desc';
  };
  projection?: {
    fields: string[];
  };
}

export type JsonEditorTreeNode = JsonEditorNode;
export type IError = JsonEditorValidationError;


export class JsonEditorOptions {
  /**
   *  Provide a custom version of the [Ace editor](http://ace.c9.io/) and use
   *  this instead of the version that comes embedded with JSONEditor. Only
   *  applicable when `mode` is `code`.
   */
  public ace: object;

  /**
   *  Provide a custom instance of [ajv](https://github.com/epoberezkin/ajv),
   *  the library used for JSON schema validation.
   */
  public ajv: object;


  /**
   *  Set a callback function triggered when the contents of the JSONEditor
   *  change.
   */
  public onChange: () => void;

  /**
   *  Set a callback function triggered when the contents of the JSONEditor
   *  change. Passes the changed JSON document.
   */
  public onChangeJSON: (json: JSON) => void;

  /**
   *  Set a callback function triggered when the contents of the JSONEditor
   *  change. Passes the changed JSON document inside a string (stringified).
   */
  public onChangeText: (jsonString: string) => void;

  /**
   *  Set a callback function to add custom CSS classes to the rendered nodes.
   *  Only applicable when option `mode` is `tree`, `form`, or `view`.
   */
  public onClassName: (node: JsonEditorNode) => string;

  /**
   *  Set a callback function to determine whether individual nodes are
   *  editable or read-only. Only applicable when option `mode` is `tree`,
   *  `text`, or `code`.
   */
  public onEditable: (node: JsonEditorNode) => boolean | { field: boolean, value: boolean };

  /**
   *  Set a callback function triggered when an error occurs. Invoked with the
   *  error as first argument. The callback is only invoked for errors
   *  triggered by a users action, like switching from code mode to tree mode
   *  or clicking the Format button whilst the editor doesn't contain valid
   *  JSON.
   */
  public onError: (error: any) => void;

  /**
   *  Set a callback function triggered right after the mode is changed by the
   *  user. Only applicable when the mode can be changed by the user (i.e. when
   *  option `modes` is set).
   */
  public onModeChange: (newMode: JsonEditorMode, oldMode: JsonEditorMode) => void;

  /**
   *  Customize the name of object and array nodes. By default the names are
   *  brackets with the number of childs inside, like `{5}` and `[32]`. The
   *  number inside can be customized. using `onNodeName`.
   */
  public onNodeName: (args: JsonEditorNodeNameArgs) => string;

  /**
   *  Set a callback function for custom validation. Available in all modes.
   */
  public onValidate: (json: JSON) => Array<JsonEditorValidationError> | Promise<Array<JsonEditorValidationError>>;

  /**
   *  Set a callback function for validation and parse errors. Available in all
   *  modes.
   */
  public onValidationError: (errors: Array<JsonEditorValidationError>) => void;

  /**
   *  Customize context menus in tree mode.
   */
  public onCreateMenu: (items: Array<JsonEditorContextMenuItem>, node: JsonEditorContextMenuNode) => void;

  /**
   *  If true, unicode characters are escaped and displayed as their
   *  hexadecimal code (like `\u260E`) instead of of the character itself (like
   *  `☎`). `false` by default.
   */
  public escapeUnicode: boolean;

  /**
   *  If true, object keys in 'tree', 'view' or 'form' mode list be listed
   *  alphabetically instead by their insertion order. Sorting is performed
   *  using a natural sort algorithm, which makes it easier to see objects that
   *  have string numbers as keys. `false` by default.
   */
  public sortObjectKeys: boolean;

  /**
   *  Enables history, adds a button Undo and Redo to the menu of the
   *  JSONEditor. `true` by default. Only applicable when `mode` is `'tree'`,
   *  `'form'`, or `'preview'`.
   */
  public history: boolean;

  /**
   *  Set the editor mode. Available values: 'tree' (default), 'view', 'form',
   *  'code', 'text', 'preview'. In 'view' mode, the data and datastructure is
   *  read-only. In 'form' mode, only the value can be changed, the data
   *  structure is read-only. Mode 'code' requires the Ace editor to be loaded
   *  on the page. Mode 'text' shows the data as plain text.
   */
  public mode: JsonEditorMode;

  /**
   *  Create a box in the editor menu where the user can switch between the
   *  specified modes.
   */
  public modes: JsonEditorMode[];

  /**
   *  Initial field name for the root node, is `undefined` by default. Can also
   *  be set using `JSONEditor.setName(name)`. Only applicable when `mode` is
   *  'tree', 'view', or 'form'.
   */
  public name: string;

  /**
   *  Validate the JSON object against a JSON schema. A JSON schema describes
   *  the structure that a JSON object must have, like required properties or
   *  the type that a value must have.
   */
  public schema: object;

  /**
   *  Schemas that are referenced using the `$ref` property from the JSON
   *  schema that are set in the `schema` option, the object structure in the
   *  form of `{reference_key: schemaObject}`
   */
  public schemaRefs: object;

  /**
   *  Enables a search box in the upper right corner of the JSONEditor. `true`
   *  by default. Only applicable when `mode` is 'tree', 'view', or 'form'.
   */
  public search: boolean;

  /**
   *  Number of indentation spaces. `2` by default. Only applicable when `mode`
   *  is 'code', 'text', or 'preview'.
   */
  public indentation: number;

  /**
   *  Set the Ace editor theme, uses included 'ace/theme/jsoneditor' by
   *  default. Please note that only the default theme is included with
   *  JSONEditor, so if you specify another one you need to make sure it is
   *  loaded.
   */
  public theme: number;

  /**
   *  Array of templates that will appear in the context menu, Each template is
   *  a json object precreated that can be added as a object value to any node
   *  in your document.
   */
  public templates: object;

  /**
   *  *autocomplete* will enable this feature in your editor in tree mode.
   */
  public autocomplete: object;

  /**
   *  Adds main menu bar - Contains format, sort, transform, search etc.
   *  functionality. `true` by default. Applicable in all types of `mode`.
   */
  public mainMenuBar: boolean;

  /**
   *  Adds navigation bar to the menu - the navigation bar visualize the
   *  current position on the tree structure as well as allows breadcrumbs
   *  navigation. `true` by default. Only applicable when `mode` is 'tree',
   *  'form' or 'view'.
   */
  public navigationBar: boolean;

  /**
   *  Adds status bar to the bottom of the editor - the status bar shows the
   *  cursor position and a count of the selected characters. `true` by
   *  default. Only applicable when `mode` is 'code', 'text', or 'preview'.
   */
  public statusBar: boolean;

  /**
   *  Set a callback function triggered when a text is selected in the
   *  JSONEditor.
   */
  public onTextSelectionChange: (start: JsonEditorTextPosition, end: JsonEditorTextPosition, text: string) => void;

  /**
   *  Set a callback function triggered when Nodes are selected in the
   *  JSONEditor.
   */
  public onSelectionChange: (start: JsonEditorSerializableNode, end: JsonEditorSerializableNode) => void;

  /**
   *  Set a callback function that will be triggered when an event will occur
   *  in  a JSON field or value.
   */
  public onEvent: (node: JsonEditorNode, event: Event) => void;

  /**
   *  If true (default), values containing a color name or color code will have
   *  a color picker rendered on their left side.
   */
  public colorPicker: boolean;

  /**
   *  Callback function triggered when the user clicks a color.
   */
  public onColorPicker: (parent: HTMLElement, color: any, onChange: (value: any) => void) => void;

  /**
   *  If `true` (default), a tag with the date/time of a timestamp is displayed
   *  right from values containing a timestamp. By default, a value is
   *  considered a timestamp when it is an integer number with a value larger
   *  than Jan 1th 2000, `946684800000`.
   */
  public timestampTag: boolean | ((args: JsonEditorNode) => boolean);

  /**
   *  Customizing the way formating the timestamp. Called when a value is
   *  timestamp after `timestampTag`. If it returns null, the timestamp would
   *  be formatted with default setting (`new Date(value).toISOString()`).
   */
  public timestampFormat: (args: JsonEditorNode) => string | null;

  /**
   *  The default language comes from the browser navigator, but you can force
   *  a specific language. So use here string as 'en' or 'pt-BR'. Built-in
   *  languages: `en`, `pt-BR`, `zh-CN`, `tr`, `ja`, `fr-FR`. Other
   *  translations can be specified via the option `languages`.
   */
  public language: string;

  /**
   *  You can override existing translations or provide a new translation for a
   *  specific language. To do it provide an object at languages with language
   *  and the keys/values to be inserted.
   */
  public languages: object;

  /**
   *  The container element where modals (like for sorting and filtering) are
   *  attached: an overlay will be created on top of this container, and the
   *  modal will be created in the center of this container.
   */
  public modalAnchor: HTMLElement;

  /**
   *  The container element where popups (for example drop down menus, for JSON
   *  Schema error tooltips, and color pickers) will be absolutely positioned.
   *  By default, this is the root DIV element of the editor itself.
   */
  public popupAnchor: HTMLElement;

  /**
   *  Enable sorting of arrays and object properties. Only applicable for mode
   *  'tree'. `true` by default.
   */
  public enableSort: boolean;

  /**
   *  Enable filtering, sorting, and transforming JSON using a
   *  [JMESPath](http://jmespath.org/) query. Only applicable for mode 'tree'.
   *  `true` by default.
   */
  public enableTransform: boolean;

  /**
   *  Number of children allowed for a given node before the "show more / show all" message appears (in 'tree', 'view',
   *  or 'form' modes). `100` by default.
   */
  public maxVisibleChilds: number;

  /**
   *  Create a query string based on query options filled in the Transform
   *  Wizard in the Transform modal.
   */
  public createQuery: (json: JSON, queryOptions: JsonEditorQueryOptions) => string;

  /**
   *  Replace the build-in query language used in the Transform modal with a
   *  custom language.
   */
  public executeQuery: (json: JSON, query: string) => JSON;

  /**
   *  A text description displayed on top of the Transform modal.
   */
  public queryDescription: string;


  /****************************
   * `ang-jsoneditor` options *
   ****************************/

  /**
   *  Automatically expand all nodes upon json loaded with the _data_ input.
   */
  public expandAll: boolean;

  constructor() {
    this.escapeUnicode = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
    this.mainMenuBar = true;
    this.navigationBar = true;
    this.statusBar = true;
    this.colorPicker = true;
    this.enableSort = true;
    this.enableTransform = true;
    this.maxVisibleChilds = 100;

    this.expandAll = false;
  }
}
