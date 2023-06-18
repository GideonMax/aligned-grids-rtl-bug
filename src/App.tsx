import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import React, { useCallback, useState } from "react";
import { useStaticRefArray } from "./useStaticRefArray";
import { AgGridReact } from "@ag-grid-community/react";
import { columnDefs, data, tableCount } from "./mockData";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);


const buttonStyle: React.CSSProperties = {
    width: "200px",
    height: "50px"
}
export const App: React.FC = () => {
    const refs = useStaticRefArray<AgGridReact>(tableCount);
    // variable only used to force rerenders as refs are not reactive
    const [_, setForceRerenderer] = useState(0);
    const forceRerender = useCallback(() => setForceRerenderer(a => ++a), []);

    const [rtl, setRtl] = useState(false);
    return (
        <div dir={rtl ? "rtl" : "ltr"}>
            <div style={{
                width: "1000px"
            }} className="ag-theme-alpine">
                <button style={buttonStyle} onClick={() => setRtl(a => !a)}>{rtl ? "rtl" : "ltr"}</button>
                {
                    data.map((tableData, idx) =>
                        <AgGridReact
                            // the key contains the direction to force component to completely rerender when direction changes, otherwise this bug doesn't occur
                            // in our case, we cannot rely on the direction starting out as ltr
                            key={idx + (rtl ? "rtl" : "ltr")}
                            rowData={tableData}
                            columnDefs={columnDefs}
                            domLayout="autoHeight"
                            ref={refs[idx]}
                            alignedGrids={[...refs.slice(0, idx), ...refs.slice(idx + 1)].flatMap(ref => ref.current || [])}
                            defaultColDef={{
                                resizable: true
                            }}
                            enableRtl={rtl}
                            onGridReady={forceRerender}
                        />
                    )
                }
            </div>
        </div>
    );
};