package main

import (
	"testing"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func TestGenerateJWT(t *testing.T) {
	username := "unittest_user"
	tokenStr, err := GenerateJWT(username)
	if err != nil {
		t.Fatalf("Expected no error, got: %v", err)
	}
	if tokenStr == "" {
		t.Fatal("Expected a non-empty token string")
	}

	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		t.Fatalf("Token parsing failed: %v", err)
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		t.Fatal("Token is invalid or claims not as expected")
	}

	if claims.Username != username {
		t.Errorf("Expected username %s, got %s", username, claims.Username)
	}

	if time.Unix(claims.ExpiresAt, 0).Before(time.Now()) {
		t.Error("Token is already expired")
	}
}
