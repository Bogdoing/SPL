export interface ChartItem {
    l_id: number
    reg_id: number
    v: number
    vr: number
    r: number
    d: string
}

export interface HhData {
    languages: Record<string, string>
    regionsHH: Record<string, string>
    hh: ChartItem[]
}