import { EnrollmentInquiryForm } from "@/components/EnrollmentInquiryForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Ready to start your learning journey? Get in touch with our enrollment team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">enrollment@eduflow.com</p>
                      <p className="text-sm text-muted-foreground">For enrollment inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">(123) 456-7890</p>
                      <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 5 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-red-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        123 Learning Street<br />
                        Education City, EC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-purple-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Enrollment Process</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>Submit an inquiry using the form or contact us directly</li>
                  <li>We&apos;ll review your application and discuss course options</li>
                  <li>Complete enrollment paperwork and payment arrangements</li>
                  <li>Receive your course access credentials within 24 hours</li>
                </ol>
              </div>
            </div>

            {/* Inquiry Form */}
            <div>
              <EnrollmentInquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
