import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { InvoicePrintHandler } from "../../../src/app/components/invoice/invoice.client";
import { dataOrderTransaction } from "../../../src/assets/ExampleOrder";
import React from "react";
import { Invoice } from "../../../src/app/components/invoice/invoice.page";

const mockUseRef = (obj: any) => () => Object.defineProperty({}, 'current',
    {
        get: () => obj,
        set: () => {
        }
    })

const reference = { current: null };
Object.defineProperty(reference, "current", {
    get: vi.fn(() => null),
    set: vi.fn(() => null),
});

describe('auth  Invoice', async () => {

    test(" test test InvoiceLayout",
        () => {
            render(
                <InvoicePrintHandler
                    redirectAction={ "" }
                    order={ dataOrderTransaction }
                />
            );
            expect(
                screen.getByRole("heading", { level: 1, name: "Invoice" }),
            ).toBeDefined();

        });

    test(" test test InvoiceLayout test ref",

        () => {

            const mockChildMethod = vi.fn();
            vi
            .spyOn(React, 'useRef')
            .mockReturnValue({
                current: {
                    childMethod: mockChildMethod
                }
            });

            render(
                <Invoice
                    invoice={ dataOrderTransaction }
                    path={ '' }
                    // ref={ mockChildMethod }
                    // isPrinting={ true }
                />
            );
            expect(
                screen.getByRole("heading", { level: 1, name: "Invoice" }),
            ).toBeDefined();

        });
});
