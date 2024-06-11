/* eslint-disable react-refresh/only-export-components */

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { EmailWrapper } from "./EmailWrapper";

/**
 * Email component for notifying students about a missing book.
 */
export const MissingBookStudentEmail = () => (
  <EmailWrapper>
    <Html>
      <Head />
      <Preview>Missing Book</Preview>
      <Body className="bg-white font-sans">
        <Container className="mx-auto p-6 pb-12 bg-no-repeat bg-bottom">
          <Container className="flex justify-center">
            <Img
              className="h-5"
              src={
                "https://vygjxzhtqazwuskkaxpz.supabase.co/storage/v1/object/public/logos/black.png"
              }
              alt="Comp Sci High Library Logo"
            />
          </Container>

          <Section className="my-6">
            <Text className="text-base leading-7 mt-4">
              Dear {"{STUDENT'S NAME}"},
            </Text>
            <Text className="text-base leading-7">
              We are writing to inform you that the book{" "}
              <span className="font-bold">"{"{BOOK NAME}"},"</span> was due on{" "}
              <span className="font-bold">{"{DUE DATE}"}, </span>
              and has not yet been returned. Please return the as soon as
              possible.
            </Text>
            <Text className="text-base leading-7 mt-4">
              If you have lost{" "}
              <span className="font-bold">"{"{BOOK NAME}"}," </span>
              please contact your English teacher for further instructions.
            </Text>
            <Link
              href={"{LINK TO RETURN BOOK}"}
              className="bg-black text-white font-bold py-3 px-4 rounded hover:bg-gray-800 mt-8 block text-center"
            >
              Return book
            </Link>
          </Section>
          <Text className="text-base leading-7 mt-4">
            Best Regards,
            <br />
            CSH Library Team
          </Text>
          <Hr className="border-t border-gray-300 mt-12" />
          <Text className="text-xs text-gray-600 ml-1">
            Urban Assembly Charter School for Computer Science
          </Text>
          <Text className="text-xs text-gray-600 ml-1">
            1300 Boynton Ave, Bronx, NY 10472
          </Text>
        </Container>
      </Body>
    </Html>
  </EmailWrapper>
);

export default MissingBookStudentEmail;
