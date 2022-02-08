// deno-lint-ignore-file no-explicit-any

export type NodeType =
  | "class"
  | "interface"
  | "typeAlias"
  | "import"
  | "enum"
  | "method"
  | "function"
  | "identifier";

export interface NodeLocation {
  line: number;
  col: number;
  filename: string;
}

export interface TsTypeRef {
  typeParams: any;
  typeName: string;
}

export interface TsType {
  repr: string;
  kind: string;
  typeRef?: TsTypeRef;
  keyword?: string;
  array?: TsType;
  union: TsType[];
}

export interface NodeParam {
  kind: NodeType;
  name: string;
  optional: boolean;
  tsType: TsType;
  left?: NodeParam;
  right?: string;
}

export interface NodeClassConstructorDef {
  jsDoc: { doc: string } | null;
  accessibility: any;
  name: string;
  params: NodeParam[];
  location: NodeLocation;
}

export interface NodeProperty {
  jsDoc: { doc: string } | null;
  tsType?: TsType;
  readonly: boolean;
  accessibility: string | null;
  optional: boolean;
  isAbstract: boolean;
  isStatic: boolean;
  name: string;
  location: NodeLocation;
}

export interface NodeClassDef {
  isAbstract: boolean;
  constructors: NodeClassConstructorDef[];
  properties: NodeProperty[];
  methods: NodeMethodDef[];
  //extends: TsType | null
  extends: string | null;
  indexSignatures: any[];
  implements: string[];
  typeParams: NodeParam[];
  superTypeParams: NodeParam[];
}

export interface NodeMethodDef {
  jsDoc: { doc: string } | null;
  accessibility: string | null;
  optional: boolean;
  isAbstract: boolean;
  isStatic: boolean;
  name: string;
  kind: string;
  functionDef: NodeFunctionDef
  location: NodeLocation
}

export interface NodeFunctionDef {
  params: NodeParam[];
  isAsync: boolean;
  isGenerator: boolean;
  returnType: TsType;
  typeParams: NodeParam[];
}

export interface NodeTypeAliasDef {
  tsType: TsType;
  typeParams: NodeParam[];
}

export interface NodeImportDef {
  src: string;
  imported: string;
}

export interface NodeEnumMember {
  jsDoc: {doc: string} | null
  name: string;
}

export interface NodeEnumDef {
  members: NodeEnumMember[];
}

export interface NodeInterfaceDef {
  extends: TsType[];
  methods: NodeMethodDef[];
  properties: NodeProperty[];
  callSignatures: any[];
  indexSignatures: any[];
  typeParams: NodeParam[];
}

export interface DocNode {
  kind: NodeType;
  name: string;
  jsDoc: { doc: string } | null;
  location: NodeLocation;
  classDef?: NodeClassDef;
  interfaceDef?: NodeInterfaceDef;
  functionDef?: NodeFunctionDef;
  typeAliasDef?: NodeTypeAliasDef;
  importDef?: NodeImportDef;
  enumDef?: NodeEnumDef;
}

export function read(): DocNode[] {
  try {
    const text = Deno.readTextFileSync(Deno.cwd() + "/docs.json");
    return JSON.parse(text).filter((e: DocNode) => e.kind !== "import");
  } catch (_e) {
    return [];
  }
}