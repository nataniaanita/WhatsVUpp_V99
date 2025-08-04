FROM rust:latest AS builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /
COPY --from=builder /app/target/release/backend-rust /usr/local/bin/backend-rust
EXPOSE 8000
CMD ["backend-rust"]

