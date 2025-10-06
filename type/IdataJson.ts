export interface GradeData {
    v: number
    vr: number
    r: number
}

export interface ChartItem {
    l_id: number
    reg_id: number
    v?: number
    vr?: number
    r?: number
    grades?: {
        "0": GradeData
        "1-3": GradeData
        "3-6": GradeData
        "6+": GradeData
    }
    d: string
}

export interface HhData {
    languages: Record<string, string>
    regionsHH: Record<string, string>
    hh: ChartItem[]
}