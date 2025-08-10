import Image from "next/image";
import { defineField, defineType } from "sanity";

export const enrollmentType = defineType({
  name: "enrollment",
  title: "Enrollment",
  type: "document",
  fields: [
    defineField({
      name: "student",
      title: "Student",
      type: "reference",
      to: [{ type: "student" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      validation: (rule) => rule.min(0),
      description: "The amount paid for the course enrollment (in Sri Lankan Rupees - Rs)",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Bank Transfer", value: "bank_transfer" },
          { title: "Check", value: "check" },
          { title: "Cash", value: "cash" },
          { title: "Online Transfer", value: "online_transfer" },
          { title: "Credit Card", value: "credit_card" },
          { title: "Free Enrollment", value: "free" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      initialValue: "free",
      description: "How the payment was received",
    }),
    defineField({
      name: "paymentReference",
      title: "Payment Reference",
      type: "string",
      description: "Bank reference number, check number, transaction ID, etc.",
      hidden: ({ document }) => document?.paymentMethod === "free",
    }),
    defineField({
      name: "paymentId",
      title: "Internal Payment ID",
      type: "string",
      description: "Internal system reference (auto-generated if not provided)",
    }),
    defineField({
      name: "paymentDate",
      title: "Payment Date",
      type: "datetime",
      description: "When the payment was received",
      hidden: ({ document }) => document?.paymentMethod === "free",
    }),
    defineField({
      name: "paymentNotes",
      title: "Payment Notes",
      type: "text",
      rows: 3,
      description: "Additional notes about the payment or enrollment",
    }),
    defineField({
      name: "verifiedBy",
      title: "Verified By",
      type: "string",
      description: "Admin who verified and processed this enrollment",
    }),
    defineField({
      name: "enrolledAt",
      title: "Enrolled At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      courseTitle: "course.title",
      studentFirstName: "student.firstName",
      studentLastName: "student.lastName",
      studentImage: "student.imageUrl",
      paymentMethod: "paymentMethod",
      amount: "amount",
      enrolledAt: "enrolledAt",
    },
    prepare({ 
      courseTitle, 
      studentFirstName, 
      studentLastName, 
      studentImage, 
      paymentMethod,
      amount,
      enrolledAt 
    }) {
      const paymentMethodLabels = {
        bank_transfer: "Bank Transfer",
        check: "Check", 
        cash: "Cash",
        online_transfer: "Online Transfer",
        credit_card: "Credit Card",
        free: "Free",
        other: "Other",
      };

      const paymentLabel = paymentMethodLabels[paymentMethod as keyof typeof paymentMethodLabels] || "Unknown";
      const amountText = amount ? `Rs ${amount}` : "Free";
      const enrollDate = enrolledAt ? new Date(enrolledAt).toLocaleDateString() : "";

      return {
        title: `${studentFirstName} ${studentLastName}`,
        subtitle: `${courseTitle} • ${paymentLabel} (${amountText}) • ${enrollDate}`,
        media: (
          <Image
            src={studentImage}
            alt={`${studentFirstName} ${studentLastName}`}
            width={100}
            height={100}
          />
        ),
      };
    },
  },
});
