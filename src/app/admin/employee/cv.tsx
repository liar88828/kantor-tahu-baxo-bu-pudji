'use client'
import { TEmployeeDB } from "@/entity/employee.model";
import { toDate } from "@/utils/formatDate";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface EmployeeCVProps {
	employee: TEmployeeDB;
}

export function EmployeeCV({ employee }: EmployeeCVProps) {
	const [isPrinting, setIsPrinting] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,

	});
	const handlePrint = () => {
		setIsPrinting(true)
		let tempTitle = document.title;
		document.title = "Special File Name.pdf";
		// window.print()
		reactToPrintFn()
		document.title = tempTitle;
		setIsPrinting(false)
	}

	return (

		<div
			ref={contentRef}

			className="card w-full max-w-3xl mx-auto bg-white ">
			<div className="card-body">

				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<div className="w-20 h-20 avatar">
							<img
								className="rounded-full"
								src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee.name}`}
								alt={employee.name} />
							{/*<p>{ employee.name.split(' ').map(n => n[0]).join('') }</p>*/}
						</div>
						<div>
							<div className="card-title text-2xl">{employee.name}</div>
							<p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
						</div>
					</div>
					<div className=" card-actions flex justify-center print:hidden">
						<button onClick={handlePrint}
							disabled={isPrinting}
							className={'btn btn-info'}>
							{isPrinting ? 'Printing...' : 'Print Invoice'}
						</button>
					</div>
				</div>
				<div className=" grid gap-6 mt-2">
					<section>
						<h3 className="font-semibold mb-2">Contact Information</h3>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<p><strong>Email:</strong> {employee.email}</p>
							<p><strong>Phone:</strong> {employee.phone}</p>
							<p><strong>Birth Date:</strong> {toDate(employee.dateOfBirth)}</p>

							<p><strong>Address:</strong> {employee.address}</p>
							<p><strong>City:</strong> {employee.city}</p>
							<p><strong>Country:</strong> {employee.country}</p>
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Professional Details</h3>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<p><strong>Department:</strong> {employee.department}</p>
							<p><strong>Hire Date:</strong> {toDate(employee.hireDate)}</p>
							<p><strong>Employee ID:</strong> {employee.id}</p>
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Skills</h3>
						<div className="flex flex-wrap gap-2">
							{employee.skills && employee.skills.map(({ text }, index) => (
								<div className="badge badge-neutral badge-outline" key={index}>
									{text}
								</div>
							))}
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Education</h3>
						<p className="text-sm">{employee.education}</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Languages</h3>
						<ul className="list-disc list-inside text-sm">
							{employee.languages && employee.languages.map(({ text: language }, index) => (
								<li key={index}>{language}</li>
							))}
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Certifications</h3>
						<ul className="list-disc list-inside text-sm">
							{employee.certifications && employee.certifications.map(({ text: cert }, index) => (
								<li key={index}>{cert}</li>
							))}
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Projects</h3>
						<ul className="list-disc list-inside text-sm">
							{employee.projects && employee.projects.map(({ text: project }, index) => (
								<li key={index}>{project}</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}

