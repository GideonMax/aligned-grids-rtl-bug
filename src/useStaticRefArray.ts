import React, { useMemo } from "react";

export function useStaticRefArray<T>(length: number): React.RefObject<T>[] {
    return useMemo(() => Array.from({ length }, () => React.createRef<T>()), []);
}